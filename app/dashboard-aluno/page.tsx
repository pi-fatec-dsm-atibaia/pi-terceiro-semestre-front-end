import BackgroundWhiteRed from "@/src/components/backgroundWhiteRed";
import { Title2 } from "@/src/components/titles";

export default function DashBoardAluno() {
  return (
    <div className="bg-(--c01)">
      <Title2>Selecione o tipo de serviço</Title2>
      <BackgroundWhiteRed>
        <div className="w-full z-10 sm:flex justify-center gap-[5%]">
          {/*SOLICITAR*/}
          <div className="relative h-[200px] sm:h-[500px] sm:w-[100%] max-w-[350px] justify-center max-sm:ml-auto max-sm:mr-auto bg-white max-sm:flex ">
            <img
              src="/images/iconeSolicitarEquivalencia.png"
              alt=""
              className="max-sm:size-[100px] size-[192px] mt-[10px] place-self-center"
            />
            <div className="z-10 sm:mt-[30px] place-self-center text-center ">
              <strong className="sm:text-4xl text-2xl">Solicitar</strong>
              <p className="mt-5 text-gray-500 sm:w-[250px] w-[150px]">
                Selecione e solicite um de nossos tipos de equivalência
                disponíveis.
              </p>
            </div>
            <img
              src="/images/iconeSetaVerde.png"
              alt=""
              className="place-self-center absolute bottom-14 max-sm:hidden size-[60px] mt-[10px]"
            />
          </div>
          {/*ACOMPANHAR*/}
          <div className="relative h-[200px] sm:h-[500px] sm:w-[100%] max-w-[350px] justify-center max-sm:ml-auto max-sm:mr-auto bg-white max-sm:flex ">
            <img
              src="/images/iconeConsultarEquivalencia.png"
              alt=""
              className="max-sm:size-[100px] size-[192px] mt-[10px] place-self-center"
            />
            <div className="z-10 sm:mt-[30px] place-self-center text-center ">
              <strong className="sm:text-4xl text-2xl">Acompanhar</strong>
              <p className="mt-5 text-gray-500 sm:w-[250px] w-[150px]">
                Acompanhe as informações das solicitações de equivalência
                realizadas.
              </p>
            </div>
            <img
              src="/images/iconeSetaAzul.png"
              alt=""
              className="place-self-center absolute bottom-14 max-sm:hidden size-[60px]"
            />
          </div>
        </div>
      </BackgroundWhiteRed>
    </div>
  );
}
