import { BotaoVoltar2 } from "@/src/components/botaoVoltar";
import SolicitacaoCard from "@/src/components/solicitations";

export default function SolicitacoesList() {
  const solicitacoes = [
    {
      data: "16/02/2025",
      protocolo: "999.992",
      documento: "CTPS",
      curso: "DSM",
      semestre: "1º Semestre",
      status: "Aprovado" as const,
    },
    {
      data: "16/02/2025",
      protocolo: "999.992",
      documento: "CTPS",
      curso: "DSM",
      semestre: "1º Semestre",
      status: "Reprovado" as const,
    },
    {
      data: "16/02/2025",
      protocolo: "999.992",
      documento: "CTPS",
      curso: "DSM",
      semestre: "1º Semestre",
      status: "Em análise" as const,
    },
    {
      data: "16/02/2025",
      protocolo: "999.992",
      documento: "CTPS",
      curso: "DSM",
      semestre: "1º Semestre",
      status: "Aprovado" as const,
    },
  ];

  return (
    <div className="relative">
      <BotaoVoltar2 />

      <div className="min-h-screen bg-[#f2f2f2] flex justify-center py-10">
        <div className="w-[95%] max-md:mt-[20px] md:w-[80%] flex flex-col gap-4">
          {solicitacoes.map((item, index) => (
            <SolicitacaoCard
              key={index}
              data={item.data}
              protocolo={item.protocolo}
              tipo={item.documento}
              curso={item.curso}
              semestre={item.semestre}
              status={item.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
