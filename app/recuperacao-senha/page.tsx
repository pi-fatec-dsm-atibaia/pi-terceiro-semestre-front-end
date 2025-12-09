"use client";

import AlertSucess from "@/src/components/alertSucess";
import AlertError from "@/src/components/alertError";
import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputEmailForm from "@/src/components/inputEmailForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { useState } from "react";
import { Title1 } from "@/src/components/titles";


export default function RecuperacaoSenha() {

	 const [email, setEmail] = useState("")
	 const [confirmAlert, setConfirmAlert] = useState(false);
	 const [errorAlert, setErrorAlert] = useState(false);
	 const [loading, setLoading] = useState(false)
	 const API_URL = process.env.NEXT_PUBLIC_URL_BACK_END;

	 async function handleSubmit(e: React.FormEvent) {
	 	e.preventDefault();
	 	setLoading(true);
	 	setConfirmAlert(false);
	 	setErrorAlert(false)

	 	try 
	 	{
	 		const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
	 			method: "POST",
	 			headers: { "Content-Type": "application/json" },
	 			body: JSON.stringify({ email: email }),
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
			 			<h3 className="font-bold">Para recuperar a sua senha, informe seu endereço de email que nós enviaremos um link para a alteração da senha</h3>
			 		</div>
			 		<div className="grid gap-3">
			 			<div>
			 				<LabelForm>Email:</LabelForm>
			 				<InputEmailForm id="email" placeholder="Informe o seu e-mail" />
			 			</div>
			 		</div>
			 		<ButtonSubmitForm>
			 			{loading ? "Enviando..." : "Enviar e-mail"}
			 		</ButtonSubmitForm>
			 		{confirmAlert && (<AlertSucess>
			 			<span className="font-medium me-1">E-mail enviado com sucesso!</span>
			 			Por favor, verifique sua caixa de entrada.
			 		</AlertSucess>)}
			 		{/* PRECISA FAZER ERRO DE ACORDO COM PROBLEMA RELATADO */}
			 		{errorAlert && (<AlertError>
			 			<span className="font-medium me-1">Erro ao enviar o e-mail!</span>
			 			{/* {errorMessage} */}
			 		</AlertError>)}
			 	</Form>
			 </BackgroundGradient>
		);
	
}