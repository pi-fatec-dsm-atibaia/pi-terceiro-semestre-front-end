"use client";
import { useState } from "react";

interface InputFormProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}

export default function InputTextForm({
  id,
  type = "text",
  placeholder,
  required = true,
  minLength = 0,
}: InputFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 w-full bg-(--c01)
        ${
          error
            ? "border border-red-500 focus:ring-red-500"
            : "focus:ring-blue-600"
        }`}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
