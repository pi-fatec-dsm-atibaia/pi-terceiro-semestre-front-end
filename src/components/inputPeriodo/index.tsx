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
  const [error, setError] = useState("");

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
    setError(message);
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
            if (error) setError("");
          }}
          onBlur={handleBlur}
          className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 bg-(--c01) w-100%
            ${
              error
                ? "border border-red-500 focus:ring-red-500"
                : "focus:ring-blue-600"
            }`}
        />

        <span className="font-semibold">Até</span>

        <input
          id={endId}
          type="date"
          value={dataFim}
          required
          onChange={(e) => {
            setDataFim(e.target.value);
            if (error) setError("");
          }}
          onBlur={handleBlur}
          className={`font-semibold focus:outline-none focus:ring-2 rounded-md p-2 bg-(--c01) w-100%
            ${
              error
                ? "border border-red-500 focus:ring-red-500"
                : "focus:ring-blue-600"
            }`}
        />
      </div>

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
