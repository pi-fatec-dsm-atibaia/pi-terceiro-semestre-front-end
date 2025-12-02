"use client";

import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Exits from "@/src/components/exits";
import Form from "@/src/components/form";
import InputEmailForm from "@/src/components/inputEmailForm";
import InputPasswordForm from "@/src/components/inputPasswordForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { Title1 } from "@/src/components/titles";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginRoute {
  url: string;
  role: string;
}

export default function Login() {
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const routes: LoginRoute[] = [
    { url: "http://localhost:3000/api/students/login", role: "aluno" },
    {
      url: "http://localhost:3000/api/advisors/login-advisor",
      role: "orientador",
    },
    {
      url: "http://localhost:3000/api/admins/login-admin",
      role: "administrador",
    },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      email: (document.getElementById("email") as HTMLInputElement).value,
      senha: (document.getElementById("senha") as HTMLInputElement).value,
    };
    for (const route of routes) {
      try {
        const response = await fetch(route.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          if (route.role === "aluno") {
            router.push("http://localhost:3001/dashboard-aluno");
          }
          if (route.role === "orientador") {
            setMensagem("Logando como orientador");
          }
          if (route.role === "administrador") {
            setMensagem("Logando como administrador");
          }
          return;
        } else {
          setMensagem(result.message || "Erro ao logar.");
        }
      } catch (err) {
        setMensagem("Falha na comunicação com o servidor.");
      }
    }
  }
  return (
    <BackgroundGradient>
      <Title1>Login</Title1>
      <Form onSubmit={handleSubmit}>
        <div className="space-y-[9%]">
          <div className="flex">
            <RedMarker />
            <h3 className="font-bold">Faça seu Login</h3>
          </div>

          <div className="grid gap-3 space-y-[15%]">
            <div>
              <LabelForm>Email:</LabelForm>
              <InputEmailForm id="email" placeholder="Informe o seu e-mail" />
            </div>
            <div>
              <LabelForm>Senha:</LabelForm>
              <InputPasswordForm id="senha" placeholder="Informe a sua senha" />
            </div>
          </div>
          <div>
            <ButtonSubmitForm>Entrar</ButtonSubmitForm>
            <Exits href="/cadastro-aluno">Não possui uma conta?</Exits>
            <Exits href="/recuperacao-senha">Esqueci minha senha</Exits>
          </div>
        </div>
        {mensagem && (
          <p className="text-center mt-3 font-bold text-red-500">{mensagem}</p>
        )}
      </Form>
    </BackgroundGradient>
  );
}