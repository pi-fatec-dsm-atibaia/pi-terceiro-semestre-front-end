"use client";

import BackgroundGradient from "@/src/components/backgroundGradient";
import { BotaoVoltar } from "@/src/components/botaoVoltar";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputCpfCnpj from "@/src/components/inputCpfCnpj";
import InputEmailForm from "@/src/components/inputEmailForm";
import InputPasswordForm from "@/src/components/inputPasswordForm";
import InputTextForm from "@/src/components/inputTextForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { SelectForm } from "@/src/components/selectForm";
import { Title1 } from "@/src/components/titles";
import { useState } from "react";

export default function CadastroOtr() {
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      nome: (document.getElementById("nomeOtr") as HTMLInputElement).value,
      email: (document.getElementById("emailOtr") as HTMLInputElement).value,
      cpf: (document.getElementById("cpfOtr") as HTMLInputElement).value,
      curso: (document.getElementById("cursoOtr") as HTMLSelectElement).value,
      senha: (document.getElementById("senhaOtr") as HTMLInputElement).value,
      confirmSenha: (document.getElementById("confirm") as HTMLInputElement)
        .value,
    };

    if (data.senha !== data.confirmSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/advisors/create-advisor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setMensagem("Orientador cadastrado com sucesso!");
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
        <BotaoVoltar />

        <Title1>Cadastro de Orientador</Title1>
        <Form onSubmit={handleSubmit}>
          <RedMarker>Dados do Orientador</RedMarker>
          <div className="space-y-[40px]">
            <div className="space-x-3 grid sm:grid-cols-2 gap-3">
              <div>
                <LabelForm>Nome:</LabelForm>
                <InputTextForm
                  id="nomeOtr"
                  placeholder="Informe o nome do orientador"
                />
              </div>
              <div>
                <LabelForm>Email:</LabelForm>
                <InputEmailForm
                  id="emailOtr"
                  placeholder="Informe o email do orientador"
                />
              </div>
            </div>
            <div className="space-x-3 grid sm:grid-cols-2 gap-3">
              <div>
                <LabelForm>CPF:</LabelForm>
                <InputCpfCnpj
                  id="cpfOtr"
                  placeholder="Informe o CPF do orientador"
                />
              </div>
              <div className="space-y-3 grid">
                <div>
                  <LabelForm>Senha:</LabelForm>
                  <InputPasswordForm
                    id="senhaOtr"
                    placeholder="Informe a senha do orientador"
                  />
                </div>
              </div>
            </div>
            <div className="space-x-3 grid sm:grid-cols-2 gap-3">
              <div>
                <LabelForm>Curso Vinculado:</LabelForm>
                <SelectForm
                  id="cursoOtr"
                  placeholder="Informe o curso do orientador"
                >
                  <option value="" selected disabled></option>
                  <option value="dsm">DSM</option>
                </SelectForm>
              </div>
              <div>
                <LabelForm>Confirmação de senha:</LabelForm>
                <InputPasswordForm
                  id="confirm"
                  placeholder="Confirme a senha"
                />
              </div>
            </div>
          </div>
          <ButtonSubmitForm>Cadastrar</ButtonSubmitForm>
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
