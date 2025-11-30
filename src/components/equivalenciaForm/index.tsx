"use client";

import React, { useState, useMemo, useCallback } from "react";
import { X, CheckCircle, UploadCloud, ChevronDown } from "lucide-react";

// ===============================================
// 1. Tipos de Dados e Mapeamento
// ===============================================

type EquivalenciaType =
  | "CTPS"
  | "Militar"
  | "Autônomo Inscrito"
  | "Autônomo Não inscrito"
  | "Empresário";

// Mapeamento dos documentos obrigatórios por tipo de equivalência
const documentosPorTipo: Record<EquivalenciaType, string[]> = {
  CTPS: ["Informativo CTPS", "Registro CTPS", "Declaração de Experiência"],
  Militar: [
    "Certidão de Tempo de Serviço",
    "Declaração de Funções",
    "Cópia da Identidade Militar",
    "Histórico de Atividades",
    "Comprovante de Tempo",
  ],
  "Autônomo Inscrito": [
    "Certificado de Registro Profissional",
    "Comprovante de Inscrição",
    "Notas Fiscais de Serviço",
    "Contratos Recentes",
    "Declaração de Imposto de Renda",
  ],
  "Autônomo Não inscrito": [
    "Contratos de Prestação de Serviço",
    "Declarações de Clientes",
    "Extrato Bancário (Comprovação de Renda)",
    "Portfólio de Projetos",
    "Testemunho de Clientes",
  ],
  Empresário: [
    "Contrato Social da Empresa",
    "Cartão CNPJ",
    "Comprovante de Faturamento (últimos 12 meses)",
    "Balanço Patrimonial",
    "Procuração (se aplicável)",
    "Certidões Negativas",
  ],
};

// Estado completo do formulário (Dados de texto/seleção)
interface FormState {
  tipoEquivalencia: EquivalenciaType;
  area: string;
  sessao: string;
  periodo: string;
  termos: string;
  aceitoTermos: boolean;
  adicionarSessao: string;
}

// Estado para o controle dos arquivos (Documentos)
interface DocumentFileState {
  [documentName: string]: File | null;
}

// ===============================================
// 2. Componente Modal
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
        className={`bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full transition-all transform ${
          isSuccess ? "border-green-500" : "border-red-500"
        } border-t-8`}
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
// 3. Componente para Upload de Item Único
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
  // Cria um ID único para associar o label ao input
  const inputId = `upload-${documentName.replace(/\s+/g, "-")}`;

  // Tipos de arquivo aceitos: Imagens (jpg, png, etc.), PDFs, e documentos Word
  const acceptedFileTypes = "image/*, application/pdf, .doc, .docx";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onFileSelect(documentName, file);
  };

  const isUploaded = !!uploadedFile;
  const statusIcon = isUploaded ? (
    <CheckCircle className="h-5 w-5 text-green-500" />
  ) : (
    <UploadCloud className="h-5 w-5 text-red-400" />
  );

  const buttonClasses = isUploaded
    ? "bg-green-100 hover:bg-green-200 text-green-800"
    : "bg-white hover:bg-gray-200 text-black";

  return (
    <div className="relative">
      {/* O Input de arquivo fica escondido */}
      <input
        type="file"
        id={inputId}
        name={documentName}
        accept={acceptedFileTypes}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Botão que simula o clique no input de arquivo */}
      <button
        type="button"
        onClick={() => document.getElementById(inputId)?.click()}
        className={`w-full flex justify-between items-center p-3 text-left rounded-lg shadow-md transition duration-150 text-sm font-medium ${buttonClasses}`}
      >
        <span className="flex flex-col truncate">
          {documentName}
          {isUploaded && (
            <span className="text-xs text-gray-500 mt-1 truncate">
              Arquivo: {uploadedFile.name}
            </span>
          )}
        </span>
        {statusIcon}
      </button>
    </div>
  );
};

// ===============================================
// 4. Componente Principal (EquivalenciaForm)
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

  // NOVO ESTADO: Armazena os arquivos (File objects)
  const [uploadedFiles, setUploadedFiles] = useState<DocumentFileState>({});

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // Determina os documentos obrigatórios com base no tipo de equivalência selecionado
  const documentosObrigatorios = useMemo(() => {
    return documentosPorTipo[formData.tipoEquivalencia];
  }, [formData.tipoEquivalencia]);

  // Função para fechar o modal
  const closeModal = useCallback(() => {
    setModalMessage(null);
  }, []);

  // Handler para atualizar o estado dos arquivos
  const handleFileChange = useCallback((name: string, file: File | null) => {
    setUploadedFiles((prevFiles) => ({
      ...prevFiles,
      [name]: file,
    }));
  }, []);

  // Handler de mudança de estado para inputs de texto/seleção
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, type } = e.target;

      const value =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Handler de envio do formulário
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // 1. Validação dos termos
      if (!formData.aceitoTermos) {
        setIsSuccessModal(false);
        setModalMessage(
          "Você deve ler e aceitar os termos de documentação para enviar a solicitação."
        );
        return;
      }

      // 2. Validação se todos os documentos obrigatórios foram anexados
      const documentosFaltantes = documentosObrigatorios.filter(
        (docName) => !uploadedFiles[docName]
      );

      if (documentosFaltantes.length > 0) {
        setIsSuccessModal(false);
        setModalMessage(
          `Por favor, anexe todos os documentos obrigatórios (${
            formData.tipoEquivalencia
          }). Documentos pendentes: ${documentosFaltantes.join(", ")}.`
        );
        return;
      }

      // 3. Lógica de Envio Real (ex: Upload para Backend)
      console.log("Dados do Formulário (Texto) Enviados:", formData);
      console.log("Documentos (Arquivos) Anexados:", uploadedFiles);

      // *** Nesta etapa, você usaria o objeto 'uploadedFiles' para enviar
      //     os documentos individualmente ou em um único objeto FormData para o seu backend. ***

      setIsSuccessModal(true);
      setModalMessage(
        "Sua solicitação de Equivalência e documentos foram recebidos com sucesso! Um e-mail de confirmação será enviado."
      );
    },
    [formData, uploadedFiles, documentosObrigatorios]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        // Ajuste Principal de Responsividade: flex-col por padrão, md:flex-row em telas maiores. Ajuste de min-height.
        className="flex flex-col md:flex-row max-w-6xl w-full shadow-2xl overflow-hidden rounded-xl bg-white md:min-h-[600px] min-h-0 h-full"
      >
        {/* BLOCO ESQUERDO (Documentação): Design Dark */}
        <div className="md:w-1/2 w-full p-6 md:p-10 bg-black text-white flex flex-col min-h-[450px] md:min-h-full">
          <h3 className="border-l-4 border-red-600 text-sm font-semibold mb-2 text-white uppercase pl-3">
            Tipo de Equivalência
          </h3>

          <div className="mb-8 relative">
            <select
              name="tipoEquivalencia"
              value={formData.tipoEquivalencia}
              onChange={handleChange}
              className="appearance-none w-full p-3 bg-white border-none rounded-lg text-black font-medium cursor-pointer focus:outline-none pr-10 transition duration-150"
            >
              {(Object.keys(documentosPorTipo) as EquivalenciaType[]).map(
                (tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                )
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <h3 className="text-sm font-semibold mb-4 border-l-4 border-red-600 pl-3 uppercase">
            Upload de Arquivo ({formData.tipoEquivalencia})
          </h3>

          {/* Div que controla o SCROLL para o conteúdo variável */}
          <div className="flex-grow overflow-y-auto space-y-3 mb-6 pr-1">
            {documentosObrigatorios.map((documento) => (
              <DocumentUploadItem
                key={documento}
                documentName={documento}
                uploadedFile={uploadedFiles[documento] || null}
                onFileSelect={handleFileChange} // Usando o novo handler
              />
            ))}
          </div>

          {/* Conteúdo inferior fixo */}
          <button
            type="button"
            className="w-full p-4 bg-white text-black font-extrabold rounded-lg shadow-xl hover:bg-gray-200 transition duration-150 uppercase tracking-wider"
          >
            Avançar
          </button>
        </div>

        {/* BLOCO DIREITO (Termos): Design Light */}
        <div className="md:w-1/2 w-full p-6 md:p-10 bg-white flex flex-col min-h-[450px] md:min-h-full">
          <h2 className="text-xl font-extrabold mb-6 border-l-4 border-red-600 pl-3 text-black uppercase">
            termos de documentação
          </h2>

          <label htmlFor="termos" className="font-semibold text-black mb-2">
            Termos
          </label>

          <textarea
            id="termos"
            name="termos"
            placeholder="Eu (seu nome) declaro para os devidos fins que todas as informações e documentos anexados são autênticos e verdadeiros, e concordo com os termos e condições de processamento de equivalência."
            value={formData.termos}
            onChange={handleChange}
            rows={8} // Ajuste de linhas para melhor visualização em mobile
            className="w-full p-4 mb-4 border border-gray-300 bg-gray-50 resize-none text-sm text-gray-700 flex-grow rounded-lg transition"
          />

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                name="aceitoTermos"
                checked={formData.aceitoTermos}
                onChange={handleChange}
                id="aceitoTermos"
                className="form-checkbox text-red-600 h-5 w-5 border-gray-400 rounded focus:ring-red-500"
              />
              <label
                htmlFor="aceitoTermos"
                className="ml-3 text-base text-gray-700"
              >
                Li e aceito os{" "}
                <span className="text-red-600 cursor-pointer font-medium hover:text-red-700 transition">
                  termos e condições
                </span>
                .
              </label>
            </div>

            <button
              type="submit"
              className={`w-full py-4 font-extrabold text-lg bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-200 uppercase tracking-wider
                ${!formData.aceitoTermos ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={!formData.aceitoTermos}
            >
              SOLICITAR EQUIVALÊNCIA
            </button>
          </div>
        </div>
      </form>

      {/* Renderiza o modal se houver mensagem */}
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
