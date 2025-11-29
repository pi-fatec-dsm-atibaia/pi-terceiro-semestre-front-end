"use client";

import React, { useRef, useState, useCallback } from "react";
import { Upload } from "lucide-react"; // Biblioteca popular de ícones (exemplo)

interface FileUploadProps {
  label: string;
  buttonText: string;
  accept: string; // Ex: "image/*, application/pdf, .doc, .docx"
  onFileUpload: (files: FileList | null) => void;
  darkStyle?: boolean; // Para o botão preto
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  buttonText,
  accept,
  onFileUpload,
  darkStyle = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Função que é chamada quando o botão é clicado (aciona o input escondido)
  const handleClick = () => {
    inputRef.current?.click();
  };

  // Função que lida com a seleção de arquivos
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFileUpload(e.target.files);
      // Opcional: Limpar o valor do input para permitir o upload do mesmo arquivo novamente
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [onFileUpload]
  );

  const baseClasses =
    "w-full py-4 px-6 rounded-md shadow-md flex items-center justify-center font-semibold transition duration-200 cursor-pointer text-base";

  const styleClasses = darkStyle
    ? "bg-black text-white hover:bg-gray-800" // Estilo para 'Informativo CTPS'
    : "bg-white text-black border border-gray-300 hover:bg-gray-50"; // Estilo para 'Registro CTPS'

  return (
    <div className="mb-4">
      {/* 1. O Input de Arquivo ESCONDIDO */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        // Define os tipos de arquivo aceitos: Imagem, PDF, Word, Texto
        accept={accept}
        className="hidden"
      />

      {/* 2. O Botão Estilizado que Aciona o Input */}
      <div className={baseClasses + " " + styleClasses} onClick={handleClick}>
        <Upload size={20} className="mr-3" /> {/* Ícone de upload */}
        {buttonText}
      </div>
    </div>
  );
};
