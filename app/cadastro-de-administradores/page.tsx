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
import { Title1 } from "@/src/components/titles";
import { useState } from "react";

export default function CadastroAdm() {
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      nome: (document.getElementById("nomeAdm") as HTMLInputElement).value,
      email: (document.getElementById("emailAdm") as HTMLInputElement).value,
      telefone: (document.getElementById("telefoneAdm") as HTMLSelectElement)
        .value,
      senha: (document.getElementById("senhaAdm") as HTMLInputElement).value,
      cpf: (document.getElementById("cpfAdm") as HTMLInputElement).value,
      confirmSenha: (document.getElementById("confirm") as HTMLInputElement)
        .value,
    };

    if (data.senha !== data.confirmSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/admins/create-admin",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setMensagem("Administrador cadastrado com sucesso!");
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
        <Title1>Cadastro de Administrador</Title1>
        <Form onSubmit={handleSubmit}>
          <RedMarker>Dados do Administrador</RedMarker>
          <div className="space-y-[40px]">
            <div className="space-x-3 grid sm:grid-cols-2 gap-3">
              <div>
                <LabelForm>Nome:</LabelForm>
                <InputTextForm
                  id="nomeAdm"
                  placeholder="Informe o nome do administrador"
                />
              </div>
              <div>
                <LabelForm>Email:</LabelForm>
                <InputEmailForm
                  id="emailAdm"
                  placeholder="Informe o email do administrador"
                />
              </div>
            </div>
            <div className="space-x-3 grid sm:grid-cols-2 gap-3">
              <div>
                <LabelForm>Telefone:</LabelForm>
                <InputTelefone id="telefoneAdm" />
              </div>
              <div>
                <LabelForm>Senha:</LabelForm>
                <InputPasswordForm
                  id="senhaAdm"
                  placeholder="Informe a senha do administrador"
                />
              </div>
            </div>
            <div className="space-x-3 grid sm:grid-cols-2 gap-3">
              <div>
                <LabelForm>CPF:</LabelForm>
                <InputCpfCnpj
                  id="cpfAdm"
                  placeholder="Informe o CPF do administrador"
                />
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
