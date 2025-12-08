interface SolicitationsProps {
  data: string;
  protocolo: string;
  tipo: string;
  curso: string;
  semestre: string;
  status: string | "Aprovado" | "Reprovado" | "Em análise";
}

export default function SolicitationsCard({
  data,
  protocolo,
  tipo,
  curso,
  semestre,
  status,
}: SolicitationsProps) {
  let statusColor: string;
  if (status === "Aprovado") {
    statusColor = "bg-green-500";
  } else if (status === "Reprovado") {
    statusColor = "bg-red-500";
  } else {
    statusColor = "bg-orange-400";
  }

  let getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <span className="text-green-500 text-xl">✅</span>;

      case "Reprovado":
        return <span className="text-red-500 text-xl">❌</span>;

      case "Em análise":
        return <span className="text-orange-500 text-xl">⏳</span>;

      default:
        return null;
    }
  };

  return (
    <div className="bg-white md:px-4 h-20 md:h-[60px] flex items-center justify-between shadow-sm overscroll-auto overflow-hidden">
      <div className="w-full flex text-sm  text-gray-700 max-md:grid max-md:grid-cols-3 gap-3 text-center md:text-left items-center justify-between">
        <a href="/minhas-solicitacoes/solicitacao" className="font-bold max-md:w-[60px] bg-gray-300 items-center md:px-3 rounded-4xl flex-none max-md:mx-auto">
          ACESSAR A SOLICITAÇÃO
        </a>
        <span>{data}</span>
        <span>{protocolo}</span>
        <span>{tipo}</span>
        <span>{curso}</span>
        <span className="flex-none">{semestre}</span>
      </div>
      {/* Status */}
      <span
        className={`text-white md:px-4 md:py-1 md:ml-5 md:rounded-full text-sm font-medium ${statusColor} flex md:flex-none max-md:h-full min-w-[60px] w-[134px] items-center justify-center`}
      >
        <span className="md:hidden text-wrap text-[15px] text-center">
          {getStatusIcon(status)}
          <br />
          {status}
        </span>
        <span className="max-md:hidden text-[15px]">▼ {status}</span>
      </span>
    </div>
  );
}
