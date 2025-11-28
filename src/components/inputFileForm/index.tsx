"use client";

import { useState } from "react";

interface InputFileFormProps {
  id: string;
  required?: boolean;

  /*Tipos de arquivos aceitos*/

  acceptedTypes?: string[]; // Ex: ["image/png", "image/jpeg", "application/pdf"]
  maxSizeMB?: number; // Tamanho máximo em MB
}

export default function InputFileForm({
  id,
  required = true,
  acceptedTypes = [],
  maxSizeMB,
}: InputFileFormProps) {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  function validate(file: File | null) {
    if (required && !file) {
      return "Você precisa selecionar um arquivo";
    }

    if (
      file &&
      acceptedTypes.length > 0 &&
      !acceptedTypes.includes(file.type)
    ) {
      return "Tipo de arquivo não permitido";
    }

    if (file && maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      return `O arquivo deve ter no máximo ${maxSizeMB}MB`;
    }

    return "";
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setError(required ? "Você precisa selecionar um arquivo" : "");
      setFileName("");
      return;
    }

    const message = validate(file);
    setError(message);

    if (!message) {
      setFileName(file.name);
    } else {
      setFileName("");
      e.target.value = ""; // limpa o input se der erro
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type="file"
        onChange={handleChange}
        className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 w-full bg-(--c01)
        ${
          error
            ? "border border-red-500 focus:ring-red-500"
            : "focus:ring-blue-600"
        }`}
      />

      {fileName && (
        <span className="text-green-600 text-sm">
          Arquivo selecionado: {fileName}
        </span>
      )}

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
