interface FormProps {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <div className="bg-white rounded-2xl flex overflow-hidden mx-auto w-screen sm:w-[80%] h-[650px] shadow relative ">
      {/* Lado Esquerdo */}
      <div className="w-0 sm:w-1/2">
        <img
          src="/images/ciemIII.jpeg"
          alt="Fatec Atibaia"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Lado Direito */}
      <div className="sm:w-1/2 p-1 mx-auto">
        <form onSubmit={onSubmit} className="items-center p-1.5 sm:p-6">
          {children}
        </form>
      </div>

      <img
        src="/images/PontosTL.png"
        alt="Fatec Atibaia"
        className="w-[5%] sm:w-[2%] max-w-[30px] absolute bottom-4 right-4"
      />
    </div>
  );
}
