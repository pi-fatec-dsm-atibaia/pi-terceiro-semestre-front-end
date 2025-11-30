import React, { useState, ChangeEvent } from 'react';

// Tipagem para os props do componente
interface DocumentUploadProps {
  label: string;
  name: string;
  onFileChange: (name: string, file: File | null) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ label, name, onFileChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  // Manipulador de eventos para quando um arquivo é selecionado
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    setFileName(file ? file.name : null);
    onFileChange(name, file); // Envia o arquivo para o componente pai
  };

  // Define os tipos de arquivo permitidos:
  // image/*: qualquer tipo de imagem
  // application/pdf: arquivos PDF (documento de texto comum)
  // .doc, .docx: arquivos do Microsoft Word
  const acceptedFileTypes = "image/*, application/pdf, .doc, .docx";

  return (
    <div style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <label htmlFor={name} style={{ fontWeight: 'bold' }}>{label}:</label>
      
      {/* O input de arquivo real, que fica invisível ou estilizado */}
      <input
        type="file"
        id={name}
        name={name}
        accept={acceptedFileTypes}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Esconda o input padrão
      />

      {/* Botão customizado que "clica" no input escondido */}
      <button 
        type="button" 
        onClick={() => document.getElementById(name)?.click()}
        style={{ marginLeft: '10px', padding: '5px 15px', cursor: 'pointer' }}
      >
        {fileName ? `Mudar Arquivo (${fileName})` : 'Selecionar Arquivo'}
      </button>

      {fileName && <p style={{ fontSize: '0.8em', marginTop: '5px' }}>Arquivo selecionado: **{fileName}**</p>}
      
    </div>
  );
};

export default DocumentUpload;