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
  const [error, setError] = useState("");

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

    if (error) {
      setError("");
    }
  };

  const handleBlur = () => {
    const message = validate(website);
    setError(message);
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
            error
              ? "border border-red-500 focus:ring-red-500"
              : "focus:ring-blue-600"
          }`}
      />
      <span
        className={`${
          error ? "visible text-red-600" : "invisible"
        } max-sm:text-[65%] sm:text-[55%] lg:text-[70%] h-5`}
      >
        {error || "placeholder"}
      </span>{" "}
    </div>
  );
}
