"use client";

import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputCpfCnpj from "@/src/components/inputCpfCnpj";
import InputEmailForm from "@/src/components/inputEmailForm";
import InputPasswordForm from "@/src/components/inputPasswordForm";
import InputTelefone from "@/src/components/inputTelefone";
import InputTextForm from "@/src/components/inputTextForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { SelectForm } from "@/src/components/selectForm";
import { Title1 } from "@/src/components/titles";
import { useEffect, useState } from "react";

type Curso = {
  id: number;
  codigo: string;
}

export default function CadastroAluno() {
  const [mensagem, setMensagem] = useState("");
  const [cursos, setCursos] = useState<Curso[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_URL_BACK_END;

  useEffect(() => {
    async function buscarCursos() {
      const response = await fetch(`${API_URL}/api/courses`);
      const data = await response.json();
      setCursos(data);
    }
    buscarCursos();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      nome: (document.getElementById("nome") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      telefone: (document.getElementById("telefone") as HTMLInputElement).value,
      cpf: (document.getElementById("cpf") as HTMLInputElement).value,
      rg: (document.getElementById("rg") as HTMLInputElement).value,
      ra: (document.getElementById("ra") as HTMLInputElement).value,
      curso: (document.getElementById("curso") as HTMLSelectElement).value,
      periodo: (document.getElementById("periodo") as HTMLSelectElement).value,
      semestre: (document.getElementById("semestre") as HTMLSelectElement)
        .value,
      senha: (document.getElementById("senha") as HTMLInputElement).value,
      confirmSenha: (
        document.getElementById("confirmSenha") as HTMLInputElement
      ).value,
    };

    if (data.senha !== data.confirmSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMensagem("Aluno cadastrado com sucesso!");
      } else {
        setMensagem(result.message || "Erro ao cadastrar.");
      }
    } catch (err) {
      setMensagem("Falha na comunicação com o servidor.");
    }
  }

  return (
    <BackgroundGradient>
      <Title1>Cadastro</Title1>

      <Form onSubmit={handleSubmit}>
        <div className="flex mb-3">
          <RedMarker />
          <h3 className="font-bold">Faça seu Cadastro</h3>
        </div>
        <div className="space-y-[40px]">
          <div className="space-x-3 grid sm:grid-cols-3 gap-3">
            <div>
              <LabelForm>Nome:</LabelForm>
              <InputTextForm id="nome" placeholder="Digite seu nome" />
            </div>
            <div>
              <LabelForm>Email:</LabelForm>
              <InputEmailForm id="email" placeholder="Informe o seu e-mail" />
            </div>
            <div>
              <LabelForm>Telefone:</LabelForm>
              <InputTelefone id="telefone" />
            </div>
          </div>

          <div className="space-x-3 grid sm:grid-cols-3 gap-3">
            <div>
              <LabelForm>CPF:</LabelForm>
              <InputCpfCnpj id="cpf" placeholder="Digite seu CPF" />
            </div>
            <div>
              <LabelForm>RG:</LabelForm>
              <InputTextForm id="rg" placeholder="Digite seu RG" />
            </div>
            <div>
              <LabelForm>RA:</LabelForm>
              <InputTextForm id="ra" placeholder="Digite seu RA" />
            </div>
          </div>

          <div className="space-x-3 grid sm:grid-cols-3 gap-3">
            <div>
              <LabelForm>Curso:</LabelForm>
              <SelectForm id="curso">
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.codigo}
                  </option>
                ))}
              </SelectForm>
            </div>
            <div>
              <LabelForm>Periodo:</LabelForm>
              <SelectForm id="periodo">
                <option value="">Escolha</option>
              </SelectForm>
            </div>
            <div>
              <LabelForm>Semestre:</LabelForm>
              <SelectForm id="semestre">
                <option value="">Escolha</option>
              </SelectForm>
            </div>
          </div>

          <div className="space-x-3 grid sm:grid-cols-2 gap-3">
            <div>
              <LabelForm>Senha:</LabelForm>
              <InputPasswordForm id="senha" placeholder="Digite uma senha" />
            </div>
            <div>
              <LabelForm>Confirme sua senha:</LabelForm>
              <InputPasswordForm
                id="confirmSenha"
                placeholder="Confirme a senha digitada"
              />
            </div>
          </div>
        </div>
        <ButtonSubmitForm>Cadastrar</ButtonSubmitForm>

        {mensagem && (
          <p className="text-center mt-3 font-bold text-red-500">{mensagem}</p>
        )}
      </Form>
    </BackgroundGradient>
  );
}