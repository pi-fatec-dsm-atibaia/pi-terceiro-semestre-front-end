"use client";

import React, { useState, useMemo, useCallback } from "react";
import { X, CheckCircle, UploadCloud, ChevronDown } from "lucide-react";
import InputTextForm from "../inputTextForm";

// ===============================================
// 1. Tipos de Dados e Mapeamento
// ===============================================

type EquivalenciaType =
  | "CTPS"
  | "Militar"
  | "AutônomoInscrito"
  | "AutônomoNãoInscrito"
  | "Proprietario";

const documentosPorTipo: Record<EquivalenciaType, string[]> = {
  CTPS: [
    "Informativo_CTPS",
    "Registro_CTPS",
  ],
  Militar: [
    "Cópia da Identidade Militar",
    "Relatório do Oficial Superior descrevendo as atribuições do aluno",
  ],
  AutônomoInscrito: [
    "Inscrição no INSS",
    "Inscrição na Prefeitura Munincipal",
    "Declaração do contador responsável pela empresa",
  ],
  AutônomoNãoInscrito: [
    "Declaração de próprio punho sobre a atividade exercida vinculada ao respectivo curso, com firma reconhecida",
  ],
  Proprietario: [
    "Contrato social da empresa",
    "Declaração do contador responsável pela empresa",
  ],
};

interface FormState {
  tipoEquivalencia: EquivalenciaType;
  area: string;
  sessao: string;
  periodo: string;
  termos: string;
  aceitoTermos: boolean;
  adicionarSessao: string;
}

interface DocumentFileState {
  [documentName: string]: File | null;
}

// ===============================================
// 2. Modal
// ===============================================

interface ModalProps {
  message: string;
  onClose: () => void;
  isSuccess?: boolean;
}

const CustomModal: React.FC<ModalProps> = ({
  message,
  onClose,
  isSuccess = false,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full border-t-8 ${
          isSuccess ? "border-green-500" : "border-red-500"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {isSuccess ? (
              <CheckCircle className="text-green-600 h-6 w-6 mr-2" />
            ) : (
              <X className="text-red-600 h-6 w-6 mr-2" />
            )}
            <h4 className="text-lg font-bold text-gray-800">
              {isSuccess ? "Sucesso!" : "Atenção"}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`w-full py-2 rounded-md font-semibold text-white transition ${
            isSuccess
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

// ===============================================
// 3. Upload individual
// ===============================================

interface DocumentUploadItemProps {
  documentName: string;
  uploadedFile: File | null;
  onFileSelect: (documentName: string, file: File | null) => void;
}

const DocumentUploadItem: React.FC<DocumentUploadItemProps> = ({
  documentName,
  uploadedFile,
  onFileSelect,
}) => {
  const inputId = `upload-${documentName.replace(/\s+/g, "-")}`;
  const acceptedFileTypes = "image/*, application/pdf, .doc, .docx";

  return (
    <div className="relative">
      <input
        type="file"
        id={inputId}
        name={documentName}
        accept={acceptedFileTypes}
        onChange={(e) =>
          onFileSelect(documentName, e.target.files ? e.target.files[0] : null)
        }
        className="hidden"
      />

      <button
        type="button"
        onClick={() => document.getElementById(inputId)?.click()}
        className={`w-full flex justify-between items-center p-3 text-left rounded-lg shadow-md transition text-sm font-medium ${
          uploadedFile
            ? "bg-green-100 hover:bg-green-200 text-green-800"
            : "bg-white hover:bg-gray-200 text-black"
        }`}
      >
        <span className="flex flex-col truncate">
          {documentName}
          {uploadedFile && (
            <span className="text-xs text-gray-500 mt-1 truncate">
              Arquivo: {uploadedFile.name}
            </span>
          )}
        </span>

        {uploadedFile ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <UploadCloud className="h-5 w-5 text-red-400" />
        )}
      </button>
    </div>
  );
};

// ===============================================
// 4. FORM PRINCIPAL
// ===============================================

export default function EquivalenciaForm() {
  const [formData, setFormData] = useState<FormState>({
    tipoEquivalencia: "CTPS",
    area: "",
    sessao: "",
    periodo: "",
    termos: "",
    aceitoTermos: false,
    adicionarSessao: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<DocumentFileState>({});
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const documentosObrigatorios = useMemo(() => {
    return documentosPorTipo[formData.tipoEquivalencia];
  }, [formData.tipoEquivalencia]);

  const closeModal = () => setModalMessage(null);

  const handleFileChange = (documentName: string, file: File | null) => {
    setUploadedFiles((prev) => ({ ...prev, [documentName]: file }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type } = e.target;
    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ============================================================
  // SUBMIT COMPLETO: Cria solicitação → envia documentos
  // ============================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos termos
    if (!formData.aceitoTermos) {
      setIsSuccessModal(false);
      setModalMessage("Você deve aceitar os termos.");
      return;
    }

    // Validação dos arquivos obrigatórios
    const documentosFaltantes = documentosObrigatorios.filter(
      (docName) => !uploadedFiles[docName]
    );

    if (documentosFaltantes.length > 0) {
      setIsSuccessModal(false);
      setModalMessage(
        `Você precisa anexar todos os documentos obrigatórios. Faltando: ${documentosFaltantes.join(
          ", "
        )}`
      );
      return;
    }

    try {
      // ======================================
      // 1️⃣ CRIA A SOLICITAÇÃO
      // ======================================
      const solicitacaoRes = await fetch("http://localhost:3000/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const solicitacaoJson = await solicitacaoRes.json();

      if (!solicitacaoRes.ok) {
        setIsSuccessModal(false);
        setModalMessage(
          solicitacaoJson.message || "Erro ao criar solicitação."
        );
        return;
      }

      const idSolicitacao = solicitacaoJson.idSolicitacao;

      // ======================================
      // 2️⃣ ENVIA OS DOCUMENTOS
      // ======================================
      const formDataUpload = new FormData();
      formDataUpload.append("idSolicitacao", idSolicitacao);

      Object.entries(uploadedFiles).forEach(([name, file]) => {
        if (file) {
          formDataUpload.append("arquivos", file);
          formDataUpload.append("nomes", name);
        }
      });

      const documentosRes = await fetch(
        "http://localhost:3000/api/request",
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      console.log(documentosRes);

      const documentosJson = await documentosRes.json();

      if (!documentosRes.ok) {
        setIsSuccessModal(false);
        setModalMessage(
          documentosJson.message || "Erro no upload dos documentos."
        );
        return;
      }

      // ======================================
      // 3️⃣ SUCESSO!
      // ======================================
      setIsSuccessModal(true);
      setModalMessage("Solicitação e documentos enviados com sucesso!");
    } catch (error) {
      console.error(error);
      setIsSuccessModal(false);
      setModalMessage("Erro ao enviar solicitação. Tente novamente.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row max-w-6xl w-full shadow-xl rounded-xl overflow-hidden bg-white"
      >
        {/* ESQUERDA */}
        <div className="md:w-1/2 h-140 w-full p-6 md:p-10 bg-black text-white flex flex-col">
          <h3 className="border-l-4 border-red-600 pl-3 uppercase font-semibold mb-2">
            Tipo de Equivalência
          </h3>

          <div className="relative mb-8">
            <select
              name="tipoEquivalencia"
              value={formData.tipoEquivalencia}
              onChange={handleChange}
              className="w-full p-3 bg-white text-black rounded-lg pr-10"
            >
              {(Object.keys(documentosPorTipo) as EquivalenciaType[]).map(
                (tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="relative mb-8">
            <h3 className="border-l-4 border-red-600 pl-3 uppercase font-semibold mb-3">
              Upload de Documentos
            </h3>
            <div className="grow overflow-y-auto space-y-3 pr-1">
              {documentosObrigatorios.map((doc) => (
                <DocumentUploadItem
                key={doc}
                documentName={doc}
                uploadedFile={uploadedFiles[doc] || null}
                onFileSelect={handleFileChange}
                />
              ))}
            </div>
          </div>

          <h3 className="border-l-4 border-red-600 pl-3 uppercase font-semibold mb-3">
            Informações importantes
          </h3>
          <div className="grow overflow-y-auto overflow-hidden text-black space-y-3 pr-1">
            <InputTextForm id="nomeEmpregador" placeholder="Nome do empregador" /> 
            <InputTextForm id="cnpj" placeholder="CNPJ" />
            <InputTextForm id="nomeEmpregador" placeholder="Nome do empregador" />
            <InputTextForm id="nomeEmpregador" placeholder="Nome do empregador" />
            <InputTextForm id="nomeEmpregador" placeholder="Nome do empregador" />
          </div>
          
           
        </div>

        {/* DIREITA */}
        <div className="md:w-1/2 w-full p-6 md:p-10 bg-white flex flex-col">
          <h2 className="text-xl font-bold border-l-4 border-red-600 pl-3 uppercase mb-6">
            Termos de documentação
          </h2>

          <label className="font-semibold text-black mb-2">Termos</label>
          <textarea
            name="termos"
            value={formData.termos}
            onChange={handleChange}
            placeholder="Escreva aqui sua declaração..."
            rows={8}
            className="w-full p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4"
          />

          <div className="mt-auto">
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="aceitoTermos"
                name="aceitoTermos"
                checked={formData.aceitoTermos}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <label htmlFor="aceitoTermos" className="ml-3 text-gray-700">
                Li e aceito os{" "}
                <span className="text-red-600 font-medium">termos</span>.
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.aceitoTermos}
              className={`w-full py-4 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition ${
                !formData.aceitoTermos ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              SOLICITAR EQUIVALÊNCIA
            </button>
          </div>
        </div>
      </form>

      {modalMessage && (
        <CustomModal
          message={modalMessage}
          onClose={closeModal}
          isSuccess={isSuccessModal}
        />
      )}
    </>
  );
}
