"use client";

import { useState } from "react";

{
  /*Interface de input*/
}

interface InputFormProps {
  id: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}

export default function InputPasswordForm({
  id,
  placeholder,
  required = false,
  minLength = 6,
}: InputFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  {
    /*Validações de preenchimento e tamanho minimo*/
  }

  function validate(val: string) {
    if (required && !val) {
      return "Este campo é obrigatório";
    }

    if (minLength > 0 && val.length < minLength) {
      return `Mínimo de ${minLength} caracteres`;
    }

    return "";
  }

  function handleBlur() {
    const message = validate(value);
    setError(message);
  }

  {
    /*Retorno do componente*/
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          id={id}
          type={"password"}
          placeholder={placeholder}
          value={value}
          required
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 w-full bg-(--c01) w-100%
          ${
            error
              ? "border border-red-500 focus:ring-red-500"
              : "focus:ring-blue-600"
          }`}
        />
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
