"use client";

import { useState, useEffect } from "react";
import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputTextForm from "@/src/components/inputTextForm"; 
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { SelectForm } from "@/src/components/selectForm";
import { Title1 } from "@/src/components/titles";

const API_BASE = "http://localhost:3000";

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
  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [courses, setCourses] = useState<Course[]>([]); // Inicia como array vazio
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [mensagem, setMensagem] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  // 1. Carregar Cursos ao iniciar
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/courses`);
        if (res.ok) {
          const data = await res.json();
          console.log("🔍 Dados brutos dos cursos:", data); // Debug no console

          let lista: Course[] = [];
          
          if (Array.isArray(data)) {
            lista = data;
          } else if (data && Array.isArray(data.data)) {
            lista = data.data;
          } else if (data && Array.isArray(data.courses)) {
            lista = data.courses;
          } else if (data && Array.isArray(data.result)) {
            lista = data.result;
          }

          setCourses(lista);
        } else {
            console.error("Erro status API Cursos:", res.status);
        }
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    };
    fetchCourses();
  }, []);

  // Buscar Orientador
  const handleSearchAdvisor = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    setLoadingSearch(true);
    setAdvisor(null);
    setMensagem(null);

    const idInput = document.getElementById("advisorId") as HTMLInputElement;
    const idValue = idInput?.value;

    if (!idValue) {
      setMensagem({ type: 'error', text: "Digite um ID para buscar." });
      setLoadingSearch(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/advisors/${idValue}`);
      
      if (res.status === 200) {
        const data = await res.json();
        
        let found: Advisor | null = null;
        if (data.nome) found = data;
        else if (data.data?.nome) found = data.data;
        else if (data.advisor?.nome) found = data.advisor;
        else if (Array.isArray(data) && data[0]) found = data[0];

        if (found) {
            setAdvisor(found);
            setMensagem({ type: 'success', text: "Orientador verificado!" });
        } else {
            setMensagem({ type: 'error', text: "Dados ilegíveis." });
        }
      } else {
        setMensagem({ type: 'error', text: "Orientador não encontrado." });
      }
    } catch (error) {
      setMensagem({ type: 'error', text: "Erro na busca." });
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setMensagem(null);
    
    const idAdvisorInput = document.getElementById("advisorId") as HTMLInputElement;
    const cursoInput = document.getElementById("cursoSelect") as HTMLSelectElement;
    const dtInicioInput = document.getElementById("dtInicio") as HTMLInputElement;
    const dtFimInput = document.getElementById("dtFim") as HTMLInputElement;

    const dados = {
        idOrientador: idAdvisorInput?.value,
        idCurso: cursoInput?.value,
        dtInicio: dtInicioInput?.value,
        dtFim: dtFimInput?.value
    };

    if (!dados.idOrientador || !dados.idCurso || !dados.dtInicio || !dados.dtFim) {
        setMensagem({ type: 'error', text: "Preencha todos os campos antes de salvar." });
        setLoadingSubmit(false);
        return;
    }

    const payload = {
      idCurso: Number(dados.idCurso),
      dtInicio: dados.dtInicio,
      dtFim: dados.dtFim,
      idOrientador: Number(dados.idOrientador)
    };

    try {
      const res = await fetch(`${API_BASE}/api/link/advisorToCourse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMensagem({ type: 'success', text: "Vínculo cadastrado com sucesso!" });
        setSelectedCourse("");
        if (dtInicioInput) dtInicioInput.value = "";
        if (dtFimInput) dtFimInput.value = "";
        if (idAdvisorInput) idAdvisorInput.value = "";
        setAdvisor(null);
        setAdvisor(null);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setMensagem({ type: 'error', text: errorData.message || "Erro ao salvar." });
      }
    } catch (error) {
      setMensagem({ type: 'error', text: "Erro de conexão ao salvar." });
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <BackgroundGradient>
      <Title1>Gestão de Vínculos</Title1>
      
      <Form onSubmit={handleSubmit}>
        <RedMarker>Dados do Vínculo</RedMarker>

        <div className="space-y-4 w-[90%]">
          
          <div className="grid sm:grid-cols-3 gap-3 items-end">
             <div className="sm:col-span-2">
                <LabelForm>ID do Orientador:</LabelForm>
                <InputTextForm id="advisorId" placeholder="Digite o ID..." />
             </div>
             <div>
                <button 
                  onClick={handleSearchAdvisor}
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-[45px] transition-colors mb-0.5"
                >
                  {loadingSearch ? "..." : "Verificar"}
                </button>
             </div>
          </div>

          {advisor && (
            <div className="bg-green-50 border border-green-200 p-3 rounded text-sm text-green-800">
               <strong>Confirmado:</strong> {advisor.nome}
            </div>
          )}

          <div>
            <LabelForm>Curso:</LabelForm>
            <SelectForm 
              id="cursoSelect" 
              value={selectedCourse}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCourse(e.target.value)}
            >
              <option value="" disabled>Selecione o curso...</option>
              {Array.isArray(courses) && courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} ({c.codigo})
                </option>
              ))}
            </SelectForm>
          </div>

          {/* DATAS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <LabelForm>Data Início:</LabelForm>
              {/* Tente type="date" se seu componente suportar, senão use padrão YYYY-MM-DD */}
              <InputTextForm id="dtInicio" placeholder="YYYY-MM-DD" type="date" />
            </div>
            <div>
              <LabelForm>Data Fim:</LabelForm>
              <InputTextForm id="dtFim" placeholder="YYYY-MM-DD" type="date" />
            </div>
          </div>

        </div>

        {mensagem && (
          <div className={`mt-4 w-[90%] text-center font-bold ${mensagem.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
            {mensagem.text}
          </div>
        )}

        <div className="mt-6 w-[90%]">
            <ButtonSubmitForm>
                {loadingSubmit ? "Processando..." : "Realizar Vínculo"}
            </ButtonSubmitForm>
        </div>

      </Form>
    </BackgroundGradient>
  );
}