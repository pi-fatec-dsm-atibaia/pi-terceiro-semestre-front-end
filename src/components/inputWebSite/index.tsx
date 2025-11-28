"use client";
import { useState } from "react";

interface InputFormProps {
  id: string;
  required?: boolean;
  minLength?: number;
}

export default function InputWebsite({
  id,
  required = false,
  minLength,
}: InputFormProps) {
  const [website, setWebsite] = useState("");
  const [erro, setErro] = useState("");

  const validarWebsite = (valor: string) => {
    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;
    return regex.test(valor);
  };

  const validate = (valor: string) => {
    if (required && !valor) {
      return "Este campo é obrigatório";
    }

    if (minLength && valor.length < minLength) {
      return `O link deve ter no mínimo ${minLength} caracteres`;
    }

    if (valor && !validarWebsite(valor)) {
      return "Link de website inválido";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);

    if (erro) {
      setErro("");
    }
  };

  const handleBlur = () => {
    const message = validate(website);
    setErro(message);
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type="url"
        value={website}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="https://www.exemplo.com"
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
