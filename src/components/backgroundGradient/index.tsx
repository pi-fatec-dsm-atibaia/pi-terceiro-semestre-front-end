export default function BackgroundGradient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative bg-(--c01) flex flex-col place-content-center">
      {/*Fundo gradient*/}
      <div className="z-10 bg-linear-to-b from-red-700 to-red-950 h-[250px] relative ">
        <img
          src="/images/PontosBL.png"
          alt="Fatec Atibaia"
          className="w-[5%] sm:w-[40px] absolute top-4 right-4"
        />
        <img
          src="/images/PontosTR.png"
          alt="Fatec Atibaia"
          className="w-[5%] sm:w-[40px] absolute bottom-4 left-4"
        />
      </div>
        <img
          src="/images/PontosBR.png"
          alt="Fatec Atibaia"
          className="w-0 sm:w-[40px] absolute botom-24 right-24"
        />
        <img
          src="/images/InovacaoTecnologiaEducacao.png"
          alt="Fatec Atibaia"
          className="h-0 sm:h-[80px] absolute mt-3 bottom-4 ml-[5%]"
        />
        {/*Formulario*/}
        <div className="items-center justify-center absolute z-20">
          {children}
        </div>
      </div>
  );
}
