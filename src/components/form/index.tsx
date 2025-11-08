export default function Form({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl flex overflow-hidden mx-auto w-screen sm:w-[80%] object-contain shadow relative">
      {/*Lado Direito*/}
      <div className="w-0 sm:w-1/2">
        <img
          src="/images/ciemIII.jpeg"
          alt="Fatec Atibaia"
          className="h-full w-full object-cover"
        />
      </div>
      {/*Lado Esquerdo*/}
      <div className="sm:w-1/2 p-1">{children}</div>

      <img
        src="/images/PontosTL.png"
        alt="Fatec Atibaia"
        className="w-[5%] sm:w-[30px] absolute bottom-4 right-4"
      />
    </div>
  );
}
