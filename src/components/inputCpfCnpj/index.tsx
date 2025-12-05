"use client";
import { useState } from "react";

interface InputFormProps {
  id: string;
  required?: boolean;
  placeholder: string;
}

export default function InputCpfCnpj({
  id,
  required = false,
  placeholder,
}: InputFormProps) {
  const [documento, setDocumento] = useState("");
  const [erro, setErro] = useState("");

  {
    /*Mascaras*/
  }

  const formatarDocumento = (valor: string) => {
    const numero = valor.replace(/\D/g, "");

    {
      /*CPF 11 digitos*/
    }
    if (numero.length <= 11) {
      return numero
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    {
      /*CNPJ 14 digitos*/
    }
    return numero
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  {
    /*Validação CPF*/
  }
  const validarCPF = (cpf: string) => {
    const valor = cpf.replace(/\D/g, "");

    if (valor.length !== 11 || /^(\d)\1+$/.test(valor)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(valor.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(valor.substring(9, 10))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma += parseInt(valor.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(valor.substring(10, 11))) return false;

    return true;
  };

  {
    /*Validação CNPJ*/
  }
  const validarCNPJ = (cnpj: string) => {
    const valor = cnpj.replace(/\D/g, "");

    if (valor.length !== 14) return false;
    if (/^(\d)\1+$/.test(valor)) return false;

    let tamanho = valor.length - 2;
    let numeros = valor.substring(0, tamanho);
    const digitos = valor.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = valor.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
  };

  const validate = (valor: string) => {
    const numero = valor.replace(/\D/g, "");

    if (required && !numero) {
      return "Este campo é obrigatório";
    }

    if (numero.length === 11 && !validarCPF(valor)) {
      return "CPF inválido";
    }

    if (numero.length === 14 && !validarCNPJ(valor)) {
      return "CNPJ inválido";
    }

    if (numero.length !== 11 && numero.length !== 14) {
      return "Informe um CPF (11 dígitos) ou CNPJ (14 dígitos)";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarDocumento(e.target.value);
    setDocumento(valorFormatado);

    if (erro) setErro("");
  };

  const handleBlur = () => {
    const message = validate(documento);
    setErro(message);
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type="text"
        value={documento}
        required
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 w-full bg-(--c01) w-100%
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
