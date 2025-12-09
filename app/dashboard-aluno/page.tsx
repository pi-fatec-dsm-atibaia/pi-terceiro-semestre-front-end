import BackgroundWhiteRed from "@/src/components/backgroundWhiteRed";
import { BotaoVoltar } from "@/src/components/botaoVoltar";
import CardDahboard from "@/src/components/card-dashboard";
import { Title2 } from "@/src/components/titles";

export default function DashBoardAluno() {
  return (
    <div className="bg-(--c01)">
      <BackgroundWhiteRed>
        <BotaoVoltar />
        <Title2>Selecione o tipo de serviço</Title2>
        <div className="w-full z-10 flex max-sm:flex-col justify-center gap-[5%] max-sm:space-y-5">
          {/*SOLICITAR*/}
          <CardDahboard
            icon="/images/iconeSolicitarEquivalencia.png"
            title="Solicitar"
            description="Selecione e solicite um de nossos tipos de equivalência disponíveis."
            arrowIcon="/images/iconeSetaVerde.png"
            link="./equivalencias"
          />

          {/*ACOMPANHAR*/}
          <CardDahboard
            icon="/images/iconeConsultarEquivalencia.png"
            title="Acompanhar"
            description="Acompanhe as informações das solicitações de equivalência realizadas."
            arrowIcon="/images/iconeSetaAzul.png"
            link="./minhas-solicitacoes"
          />
        </div>
      </BackgroundWhiteRed>
    </div>
  );
}
