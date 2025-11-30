interface ResumoSolicitacaoProps {
  dataSolicitacao: string;
  protocolo: string;
  tipoEquivalencia: string;
  nomeAluno: string;
  cpf: string;
  status: string;
}

export default function ResumoSolicitacao({
  dataSolicitacao,
  protocolo,
  tipoEquivalencia,
  nomeAluno,
  cpf,
  status,
}: ResumoSolicitacaoProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-3 gap-y-2 text-sm">
        <p>
          <strong>Data de solicitação:</strong> {dataSolicitacao}
        </p>
        <p>
          <strong>Protocolo:</strong> {protocolo}
        </p>
        <p>
          <strong>Tipo de equivalência:</strong> {tipoEquivalencia}
        </p>

        <p>
          <strong>Nome do aluno:</strong> {nomeAluno}
        </p>
        <p>
          <strong>CPF:</strong> {cpf}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </div>

      <div className="border border-gray-300 rounded-md p-4 mt-4 flex justify-center gap-8">
        <button className="border border-gray-700 px-6 py-2 font-semibold">
          Informativo CTPS
        </button>
        <button className="border border-gray-700 px-6 py-2 font-semibold">
          Registro CTPS
        </button>
      </div>
    </div>
  );
}
