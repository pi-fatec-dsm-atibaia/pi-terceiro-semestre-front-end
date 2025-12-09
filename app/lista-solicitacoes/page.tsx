"use client"

import SolicitacaoCard from "@/src/components/solicitations";
import { useEffect, useState } from "react";

type Solicitacao = {
  id: number;
  nomeAluno: string;
  dtSolicitacao: string;
  protocolo: string;
  tipoEquivalencia: string;
  curso: string;
  semestre: string;
  status: string;
};

export default function SolicitacoesList() {
  
  const id = Number(localStorage.getItem("id_"));
  const [solicitacoes, setSolicicoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_URL_BACK_END;
  
  
  useEffect(() => {
    async function fetchData() {
      
      try {
        const response = await fetch(`${API_URL}/api/link/advisorToCourse/${id}`);
        const id_curso = await response.json();

        if (!id) {
          console.error("Nenhum ID encontrado no localStorage");
          setLoading(false);
          return;
        }

         const resp = await fetch(`${API_URL}/api/request/course/${id_curso.data.idCurso}`);
         const data = await resp.json();

         console.log(data);

         const solicit: Solicitacao[] = data.data.map((item: any) => ({
           id: item.id,
           nomeAluno: item.aluno?.nome,
           dtSolicitacao: item.dtSolicitacao,
           protocolo: item.protocolo,
           tipoEquivalencia: item.equivalencia.tipoEquivalencia,
           curso: item.aluno?.curso?.codigo ?? "—",
           semestre: item.aluno?.curso?.quantSemestre
             ? `${item.aluno.curso.quantSemestre}º semestre`
             : "—",
           status: item.statusSolicitacao ?? "Em análise",
         }));

         setSolicicoes(solicit);

      } catch (error) {
        console.error("Erro ao buscar as solicitações:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id,API_URL]);

  if (loading) {
    return <p className="text-center mt-10">Carregando solicitações...</p>;
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex justify-center py-10">
      <div className="w-[95%] md:w-[80%] flex flex-col gap-4">
        {solicitacoes.map((item) => (
          <SolicitacaoCard
            link="lista-solicitacoes/solicitacao/"
            key={item.id}
            nomeAluno={item.nomeAluno}
            data={item.dtSolicitacao}
            protocolo={item.protocolo}
            tipo={item.tipoEquivalencia}
            curso={item.curso}
            semestre={item.semestre}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}
