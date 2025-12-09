"use client";
import { useState } from "react";

interface InputFormProps {
  id: string;
  required?: boolean;
  placeholder: string;
}

export default function InputRg({
  id,
  required = false,
  placeholder,
}: InputFormProps) {
  const [rg, setRg] = useState("");
  const [error, setError] = useState("");

  /* -----------------------------
      Máscara de RG
     ----------------------------- 
     Formatos aceitos no BR variam, mas vamos adotar:
     12.345.678-9
  --------------------------------*/
  const formatarRg = (valor: string) => {
    const numero = valor.replace(/\D/g, "");

    return numero
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1})$/, "$1-$2");
  };

  /* -----------------------------
      Validação de RG
     ----------------------------- 
     RG não tem validação matemática padrão nacional.
     Validação usada:
     - 5 a 14 caracteres numéricos
     - Não aceitar todos dígitos iguais
  --------------------------------*/
  const validarRg = (valor: string) => {
    const numero = valor.replace(/\D/g, "");

    if (numero.length < 5 || numero.length > 14) return false;
    if (/^(\d)\1+$/.test(numero)) return false;

    return true;
  };

  const validate = (valor: string) => {
    const numero = valor.replace(/\D/g, "");

    if (required && !numero) {
      return "Este campo é obrigatório";
    }

    if (!validarRg(valor)) {
      return "RG inválido";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarRg(e.target.value);
    setRg(valorFormatado);

    if (error) setError("");
  };

  const handleBlur = () => {
    const message = validate(rg);
    setError(message);
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type="text"
        value={rg}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 w-full bg-(--c01)
        ${
          error
            ? "border border-red-500 focus:ring-red-500"
            : "focus:ring-blue-600"
        }
      `}
      />

      {/* Mantém espaço fixo (não empurra nada) */}
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
