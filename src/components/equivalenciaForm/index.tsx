"use client"; // Necessário para usar hooks como useState

import React, { useState } from "react";
// Aqui você importaria seus componentes de UI, como Input, Select, Button, etc.

interface FormState {
  area: string;
  sessao: string;
  periodo: string;
  termos: string;
  aceitoTermos: boolean;
  adicionarSessao: string;
}

export function EquivalenciaForm() {
  const [formData, setFormData] = useState<FormState>({
    area: "", // Valor inicial da imagem
    sessao: "",
    periodo: "", // Valor inicial da imagem
    termos: "", // Texto dos termos
    aceitoTermos: false,
    adicionarSessao: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceitoTermos) {
      alert("Você deve aceitar os termos para solicitar a equivalência.");
      return;
    }
    console.log("Dados do Formulário:", formData);
    // Lógica de envio da API (chamar uma função de src/services)
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex bg-white ml-5">
      {/* -------------------- BLOCO ESQUERDO (Avançar/Retornar) -------------------- */}
      <div className="w-1/3 p-8 relative bg-black text-white rounded-l-lg equivalence-form-left-bg">
        <h3 className="text-xs text-white mb-4">ÁREA DE TRABALHO</h3>
        {/* Campo 'Área de Trabalho' (Simulado com um input para layout) */}
        <input
          type="text"
          placeholder="Ex: Front-End"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="w-full p-2 mb-6 bg-white border text-black"
        />

        <h3 className="text-xs text-white mb-4">SESSÃO DE ATIVIDADES</h3>
        <input
          type="text"
          name="sessao"
          placeholder="Ex: Desenvolvimento de Componentes"
          value={formData.sessao}
          onChange={handleChange}
          className="w-full p-2 mb-6 bg-white border text-black"
        />

        <input
          type="text"
          name="adicionarSessao"
          placeholder="Adicionar Atividades"
          value={formData.adicionarSessao}
          onChange={handleChange}
          className="w-full p-2 mb-6 bg-stone-900 text-white"
        />
        {/* Adicione aqui os campos de 'Sessão de Atividades' se necessário */}

        <h3 className="text-xs text-white mb-4">PERÍODO DE TRABALHO</h3>
        <input
          type="text" // Usar um DatePicker real
          name="periodo"
          placeholder="Ex: Matutino Vespertino ou Noturno"
          value={formData.periodo}
          onChange={handleChange}
          className="w-full p-2 mb-10 bg-white border text-black"
        />

        {/* Botões de Navegação (Para um multi-step form) */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex justify-center space-x-2 mb-6">
            <span className="h-2 w-2 bg-red-500 rounded-full"></span>
            <span className="h-2 w-2 bg-gray-600 rounded-full"></span>
            <span className="h-2 w-2 bg-gray-600 rounded-full"></span>
            <span className="h-2 w-2 bg-gray-600 rounded-full"></span>
          </div>

          <button
            type="button"
            className="w-full py-3 mb-4 font-semibold border-2 hover:bg-gray-800 hover:text-white transition duration-200"
          >
            AVANÇAR
          </button>
          <button
            type="button"
            className="w-full py-3 font-semibold bg-black text-white border-2 border-white hover:bg-gray-800 transition duration-200"
          >
            RETORNAR
          </button>
        </div>
      </div>

      {/* -------------------- BLOCO DIREITO (Termos) -------------------- */}
      <div className="me-4 p-8 mb-20">
        <h3 className="text-xs font-semibold text-gray-700 mb-4">
          TERMOS DE DOCUMENTAÇÃO
        </h3>
        <p className="font-semibold me-100 text-gray-800 mb-4 ">Termos</p>
        <textarea
          name="termos"
          placeholder="Eu (seu nome) declaro que ..."
          value={formData.termos}
          onChange={handleChange}
          rows={10}
          className="w-10/8 p-4 mb-4 border border-gray-300 bg-gray-100 resize-none text-sm text-gray-700"
        />

        <div className="flex items-center mb-8">
          <input
            type="checkbox"
            name="aceitoTermos"
            checked={formData.aceitoTermos}
            onChange={handleChange}
            id="aceitoTermos"
            className="form-checkbox text-red-500 h-5 w-5"
          />
          <label htmlFor="aceitoTermos" className="ml-3 text-sm text-gray-700">
            Li e aceito os{" "}
            <span className="text-red-500 cursor-pointer hover:underline">
              termos e condições
            </span>
            .
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 font-semibold bg-red-500 text-white disabled:bg-red-300 hover:bg-red-600 transition duration-200"
          disabled={!formData.aceitoTermos}
        >
          SOLICITAR EQUIVALÊNCIA
        </button>
      </div>
    </form>
  );
}
