"use client";

import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputTextForm from "@/src/components/inputTextForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { SelectForm } from "@/src/components/selectForm";
import { Title1 } from "@/src/components/titles";
import { useState } from "react";

export default function CadastroCurso() {
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      nome: (document.getElementById("nome") as HTMLInputElement).value,
      codigo: (document.getElementById("codigo") as HTMLInputElement).value,
      periodo: (document.getElementById("periodo") as HTMLSelectElement).value,
      quantSemestre: (
        document.getElementById("quantSemestre") as HTMLSelectElement
      ).value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setMensagem("Curso cadastrado com sucesso!");
      } else {
        setMensagem(result.message || "Erro ao cadastrar.");
      }
    } catch (err) {
      setMensagem("Falha na comunicação com o servidor.");
    }
  }
  return (
    <div className=" bg-(--c01)">
      <BackgroundGradient>
        <Title1>Cadastro de Curso</Title1>
        <Form onSubmit={handleSubmit}>
          <div className="flex">
            <RedMarker />
            <h3 className="font-bold">Dados do curso</h3>
          </div>
          <div className="space-y-[40px]">
            <div className="space-x-3 grid sm:grid-cols-2 gap-3">
              <div>
                <LabelForm>Nome:</LabelForm>
                <InputTextForm
                  id="nome"
                  placeholder="Informe o nome do curso"
                />
              </div>
              <div>
                <LabelForm>Código:</LabelForm>
                <InputTextForm
                  id="codigo"
                  placeholder="Informe o código abreviado"
                />
              </div>
            </div>

            <LabelForm>Periodo:</LabelForm>
            <SelectForm id="periodo">
              <option value="" selected disabled>
                --Selecione uma opção--
              </option>
              <option value="matutino">Matutino</option>
              <option value="vespertino">Vespertino</option>
              <option value="noturno">Noturno</option>
            </SelectForm>

            <LabelForm>Semestres:</LabelForm>
            <SelectForm id="quantSemestre">
              <option value="" selected disabled>
                Escolha
              </option>
              <option value="1">1 Semestre</option>
              <option value="2">2 Semestres</option>
              <option value="3">3 Semestres</option>
              <option value="4">4 Semestres</option>
              <option value="5">5 Semestres</option>
              <option value="6">6 Semestres</option>
            </SelectForm>
          </div>
          <ButtonSubmitForm>Cadastrar Curso</ButtonSubmitForm>
          {mensagem && (
            <p className="text-center mt-3 font-bold text-red-500">
              {mensagem}
            </p>
          )}
        </Form>
      </BackgroundGradient>
    </div>
  );
}
