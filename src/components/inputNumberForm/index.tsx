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

export default function InputNumberForm({
  id,
  placeholder,
  required = false,
  minLength = 6,
}: InputFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  {
    /*Validações de preenchimento*/
  }

  function validate(val: string) {
    if (required && !val) {
      return "Este campo é obrigatório";
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
      <input
        id={id}
        type={"number"}
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

      <span
        className={`${
          error ? "visible text-red-600" : "invisible"
        } max-sm:text-[65%] sm:text-[55%] lg:text-[70%] h-5`}
      >
        {error || "placeholder"}
      </span>
    </div>
  );
}
