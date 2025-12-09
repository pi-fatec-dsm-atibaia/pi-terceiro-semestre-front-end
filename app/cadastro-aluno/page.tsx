"use client";

import { useState, useEffect } from "react";

// Seus Componentes
import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputTextForm from "@/src/components/inputTextForm"; 
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { SelectForm } from "@/src/components/selectForm";
import { Title1 } from "@/src/components/titles";

const API_BASE = "http://localhost:3000";

// Tipagem
interface Advisor {
  nome: string;
  email: string;
  [key: string]: any; 
}

interface Course {
  id: number;
  nome: string;
  codigo: string;
}

export default function AdvisorLinker() {
  // --- Estados apenas para exibir/ocultar elementos e guardar dados da API ---
  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  // 1. Carregar Cursos ao iniciar
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/courses`);
        if (res.ok) {
          const data = await res.json();
          // Lógica de "Caça ao Array" (igual a anterior)
          let lista: Course[] = [];
          if (Array.isArray(data)) lista = data;
          else if (Array.isArray(data.data)) lista = data.data;
          else if (Array.isArray(data.courses)) lista = data.courses;
          else if (Array.isArray(data.result)) lista = data.result;
          setCourses(lista);
        }
      } catch (error) {
        console.error("Erro cursos:", error);
      }
    };
    fetchCourses();
  }, []);

  // 2. Buscar Orientador (Usando getElementById igual ao seu exemplo)
  const handleSearchAdvisor = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMensagem(null);
    setAdvisor(null);

    // PEGA O VALOR DIRETO DO DOM
    const idInput = document.getElementById("searchId") as HTMLInputElement;
    const idValue = idInput?.value;

    if (!idValue) {
      setMensagem({ type: 'error', text: "Digite o ID do orientador." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/advisors/${idValue}`);
      if (res.status === 200) {
        const data = await res.json();
        
        // Lógica de "Caça ao Objeto"
        let found: Advisor | null = null;
        if (data.nome) found = data;
        else if (data.data?.nome) found = data.data;
        else if (data.advisor?.nome) found = data.advisor;
        else if (Array.isArray(data) && data[0]) found = data[0];

        if (found) setAdvisor(found);
        else setMensagem({ type: 'error', text: "Dados ilegíveis." });

      } else {
        setMensagem({ type: 'error', text: "Orientador não encontrado." });
      }
    } catch (error) {
      setMensagem({ type: 'error', text: "Erro de conexão." });
    } finally {
      setLoading(false);
    }
  };

  // 3. Salvar Vínculo
  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // PEGA OS VALORES DIRETO DO DOM (Igual ao seu CadastroAluno)
    const searchIdInput = document.getElementById("searchId") as HTMLInputElement;
    const cursoInput = document.getElementById("cursoSelect") as HTMLSelectElement;
    const dtInicioInput = document.getElementById("dtInicio") as HTMLInputElement;
    const dtFimInput = document.getElementById("dtFim") as HTMLInputElement;

    const dados = {
        idOrientador: searchIdInput?.value,
        idCurso: cursoInput?.value,
        dtInicio: dtInicioInput?.value,
        dtFim: dtFimInput?.value
    };

    if (!dados.idCurso || !dados.dtInicio || !dados.dtFim || !dados.idOrientador) {
      setMensagem({ type: 'error', text: "Preencha todos os campos." });
      return;
    }

    const payload = {
      idCurso: Number(dados.idCurso),
      dtInicio: dados.dtInicio,
      dtFim: dados.dtFim,
      idOrientador: Number(dados.idOrientador)
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/link/advisorToCourse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMensagem({ type: 'success', text: "Vínculo realizado com sucesso!" });
        // Limpar campos manualmente
        if(cursoInput) cursoInput.value = "";
        if(dtInicioInput) dtInicioInput.value = "";
        if(dtFimInput) dtFimInput.value = "";
      } else {
        const errorData = await res.json().catch(() => ({}));
        setMensagem({ type: 'error', text: errorData.message || "Erro ao vincular." });
      }
    } catch (error) {
      setMensagem({ type: 'error', text: "Erro de comunicação." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundGradient>
      <Title1>Gestão de Vínculos</Title1>

      {/* --- BLOCO DE BUSCA --- */}
      <div className="w-[90%] mx-auto bg-white/50 p-4 rounded-lg mb-6 backdrop-blur-sm">
        <RedMarker>1. Buscar Orientador</RedMarker>
        <div className="flex items-end gap-4 mt-4">
          <div className="flex-1">
            <LabelForm>ID do Orientador:</LabelForm>
            {/* Removi value/onChange, deixei apenas o ID */}
            <InputTextForm id="searchId" placeholder="Ex: 1" />
          </div>
          <button 
            onClick={handleSearchAdvisor}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded h-[45px] transition-colors"
          >
            {loading ? "..." : "Buscar"}
          </button>
        </div>
      </div>

      {/* --- MENSAGENS (Exibe erro ou sucesso) --- */}
      {mensagem && (
         <div className={`mb-4 w-[90%] mx-auto p-3 text-center font-bold rounded ${mensagem.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {mensagem.text}
         </div>
      )}

      {/* --- FORMULÁRIO DE VÍNCULO (Só aparece se advisor existir) --- */}
      {advisor && (
        <Form onSubmit={handleLinkSubmit}>
          <RedMarker>2. Vincular ao Curso</RedMarker>
          
          <div className="bg-gray-100 p-4 rounded mb-4 border-l-4 border-red-500">
            <p className="text-gray-700"><strong>Nome:</strong> {advisor.nome}</p>
            <p className="text-gray-700"><strong>Email:</strong> {advisor.email}</p>
          </div>

          <div className="space-y-3 grid gap-3 w-[90%]">
            
            <div>
              <LabelForm>Curso:</LabelForm>
              {/* Removi onChange, deixei apenas ID */}
              <SelectForm id="cursoSelect">
                <option value="" disabled selected>Selecione um curso...</option>
                {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.nome} - {c.codigo}
                    </option>
                ))}
              </SelectForm>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <LabelForm>Data Início:</LabelForm>
                {/* Se seu InputTextForm não aceitar type="date", troque por <input type="date" ... /> padrão do HTML */}
                <InputTextForm id="dtInicio" placeholder="YYYY-MM-DD" /> 
              </div>
              <div>
                <LabelForm>Data Fim:</LabelForm>
                <InputTextForm id="dtFim" placeholder="YYYY-MM-DD" />
              </div>
            </div>

          </div>

          <div className="mt-6 w-[90%]">
             <ButtonSubmitForm>Confirmar Vínculo</ButtonSubmitForm>
          </div>

        </Form>
      )}

    </BackgroundGradient>
  );
}