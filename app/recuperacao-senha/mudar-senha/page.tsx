"use client";

import AlertError from "@/src/components/alertError";
import AlertSucess from "@/src/components/alertSucess";
import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import InputPasswordForm from "@/src/components/inputPasswordForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { Title1 } from "@/src/components/titles";
import Form from "@/src/components/form";
import { useState } from "react";

export default function MudarSenha() {

    const [confirmAlert, setConfirmAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false)
    const API_URL = process.env.NEXT_PUBLIC_URL_BACK_END;
    let novaSenha = "";
    const queryString = window.location.search;

    // Cria um objeto URLSearchParams para facilitar a manipulação dos parâmetros
    const urlParams = new URLSearchParams(queryString);
    // Usa o método 'get' para obter o valor do parâmetro específico (neste caso, 'token')
    const token = urlParams.get('token');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setConfirmAlert(false);
        setErrorAlert(false);

        novaSenha = (document.getElementById("senha") as HTMLInputElement).value;

        try {
            const res = await fetch(`${API_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: token, newPassword: novaSenha }),
            })

            if (!res.ok) {
                setErrorAlert(true);
                return;
            }
            setConfirmAlert(true)
            
        } catch (err: any) {
            console.error(err);
            setErrorAlert(true)
        } finally {
            setLoading(false);
        }
    }

    return (
        <BackgroundGradient>
            <Title1>Recuperação de senha</Title1>
            <Form onSubmit={handleSubmit}>
                <div className="flex">
                    <RedMarker />
                    <h3 className="font-bold">Digite sua nova senha</h3>
                </div>
                <div className="grid gap-3">
                    <div>
                        <LabelForm>Nova senha:</LabelForm>
                        <InputPasswordForm id="senha" placeholder="Informe a nova senha" />
                    </div>
                </div>
                <ButtonSubmitForm>
                    {loading ? "Enviando..." : "Confirmar nova senha"}
                </ButtonSubmitForm>

            </Form>
        </BackgroundGradient>
    );
}