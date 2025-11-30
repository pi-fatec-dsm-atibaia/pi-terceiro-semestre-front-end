"use client";
import { useState } from "react";

interface InputFormProps {
  id: string;
  required?: boolean;
  minLength?: number;
}

export default function InputTelefone({
  id,
  required = true,
  minLength,
}: InputFormProps) {
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");

  // Máscara
  const formatarTelefone = (valor: string) => {
    const numero = valor.replace(/\D/g, "");

    if (numero.length <= 10) {
      return numero.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }

    return numero.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const validarTelefone = (valor: string) => {
    const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return regexTelefone.test(valor);
  };

  const validate = (telefone: string) => {
    if (required && !telefone) {
      return "Este campo é obrigatório";
    }

    if (minLength && telefone.length < minLength) {
      return `O telefone deve ter no mínimo ${minLength} caracteres`;
    }

    if (telefone && !validarTelefone(telefone)) {
      return "Número de telefone inválido";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarTelefone(e.target.value);
    setTelefone(valorFormatado);

    if (erro) setErro("");
  };

  const handleBlur = () => {
    const message = validate(telefone);
    setErro(message);
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type="text"
        value={telefone}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Informe o número de telefone"
        className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 w-full bg-(--c01)
          ${
            erro
              ? "border border-red-500 focus:ring-red-500"
              : "focus:ring-blue-600"
          }`}
      />

      {erro && <span className="text-red-600 text-sm">{erro}</span>}
    </div>
  );
}
