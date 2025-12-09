"use client";
import { useState } from "react";

interface SelectFormProps {
  id: string;
  placeholder?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function SelectForm({
  id,
  placeholder = "Selecione...",
  required = true,
  children,
}: SelectFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function validate(val: string) {
    if (required && !val) {
      return "Selecione uma opção";
    }
    return "";
  }

  function handleBlur() {
    const message = validate(value);
    setError(message);
  }

  return (
    <div className="flex flex-col gap-1">
      <select
        id={id}
        value={value}
        required
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 w-full bg-(--c01)
        ${
          error
            ? "border border-red-500 focus:ring-red-500"
            : "focus:ring-blue-600"
        }`}
      >
        {/* Placeholder bloqueado */}
        <option value="" disabled>
          {placeholder}
        </option>

        {children}
      </select>
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
