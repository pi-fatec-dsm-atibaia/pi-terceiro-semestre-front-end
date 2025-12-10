import BackgroundWhiteRed from "@/src/components/backgroundWhiteRed";
import Link from "next/link";

export default function DashBoardAdministrador() {
  return (
    <div className="bg-(--c01)">   
      <h1 className="text-3xl sm:text-4xl text-gray-900 font-bold sm:mt-[50px] mt-[35px] ml-5 z-10 bo">
        Dashboard Administrador
      </h1>
      <BackgroundWhiteRed>
        <div className="w-full z-10 sm:flex justify-center gap-[5%]">
          
          {/*Cadastro de administrador*/}
          <Link href="./cadastro/administrador">
            <div className="relative h-[150px] sm:h-[375px] sm:w-full max-w-[260px] max-sm:ml-auto max-sm:mr-auto bg-white max-sm:flex shadow-xl/25 flex flex-col justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="max-sm:size-[75px] size-36 mt-2.5 place-self-center stroke-[#28A745]">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <div className="z-10 sm:mt-5 place-self-center text-center">
                <strong className="sm:text-3xl text-xl">Cadastrar Administrador</strong>
              </div>
              <img
                src="/images/iconeSetaVerde.png"
                alt=""
                className="place-self-center bottom-14 max-sm:hidden size-[45px]"
              />
            </div>
          </Link>

          {/*Cadastro de curso*/}
          <Link
            href="./cadastro/curso"
            className="h-[150px] sm:h-[375px] sm:w-full max-w-[260px]"
          >
            <div className="relative h-[150px] sm:h-[375px] sm:w-full max-w-[260px] max-sm:ml-auto max-sm:mr-auto bg-white max-sm:flex ring/20 shadow-xl/25 flex flex-col justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="max-sm:size-[75px] size-36 mt-2.5 place-self-center stroke-[#007BFF]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              <div className="z-10 sm:mt-5 place-self-center text-center">
                <strong className="sm:text-3xl text-xl">Cadastrar <br/> Curso</strong>
              </div>
              <img
                src="/images/iconeSetaAzul.png"
                alt=""
                className="place-self-center bottom-14 max-sm:hidden size-[45px]"
              />
            </div>
          </Link>

          {/* Cadastrar Orientadores */}
          <Link
            href="./cadastro/orientador"
            className="h-[150px] sm:h-[375px] sm:w-full max-w-[260px]"
          >
            <div className="relative h-[150px] sm:h-[375px] sm:w-full max-w-[260px] max-sm:ml-auto max-sm:mr-auto bg-white max-sm:flex ring/20 shadow-xl/25 flex flex-col justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="max-sm:size-[75px] size-36 mt-2.5 place-self-center stroke-[#28A745]">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <div className="z-10 sm:mt-5 place-self-center text-center">
                <strong className="sm:text-3xl text-xl">Cadastrar Orientador</strong>
              </div>
              <img
                src="/images/iconeSetaVerde.png"
                alt=""
                className="place-self-center bottom-14 max-sm:hidden size-[45px]"
              />
            </div>
          </Link>
        </div>
      </BackgroundWhiteRed>
    </div>
  );
}