"use client";
import { useState } from "react";

interface InputPeriodoProps {
  startId: string;
  endId: string;
  required?: boolean;
}

export default function InputPeriodoTrabalho({
  startId,
  endId,
  required = false,
}: InputPeriodoProps) {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [erro, setErro] = useState("");

  const validate = () => {
    if (required && (!dataInicio || !dataFim)) {
      return "As duas datas são obrigatórias";
    }

    if (dataInicio && dataFim) {
      const inicio = new Date(dataInicio);
      const fim = new Date(dataFim);

      if (fim < inicio) {
        return "A data final não pode ser menor que a inicial";
      }
    }

    return "";
  };

  const handleBlur = () => {
    const message = validate();
    setErro(message);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <input
          id={startId}
          type="date"
          value={dataInicio}
          onChange={(e) => {
            setDataInicio(e.target.value);
            if (erro) setErro("");
          }}
          onBlur={handleBlur}
          className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 bg-(--c01)
            ${
              erro
                ? "border border-red-500 focus:ring-red-500"
                : "focus:ring-blue-600"
            }`}
        />

        <span className="font-semibold">Até</span>

        <input
          id={endId}
          type="date"
          value={dataFim}
          onChange={(e) => {
            setDataFim(e.target.value);
            if (erro) setErro("");
          }}
          onBlur={handleBlur}
          className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 bg-(--c01)
            ${
              erro
                ? "border border-red-500 focus:ring-red-500"
                : "focus:ring-blue-600"
            }`}
        />
      </div>

      {erro && <span className="text-red-600 text-sm">{erro}</span>}
    </div>
  );
}
