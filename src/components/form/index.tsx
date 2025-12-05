interface FormProps {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <div className="bg-white rounded-2xl flex overflow-hidden mx-auto w-screen md:w-[80%] h-[400px] shadow relative ">
      {/* Lado Esquerdo */}
      <div className="w-0 md:w-2/5">
        <img
          src="/images/ciemIII.jpeg"
          alt="Fatec Atibaia"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Lado Direito */}
      <div className="w-[100%] md:w-3/5 p-1 mx-auto overflow-y-auto">
        <form onSubmit={onSubmit} className="items-center p-1.5 md:p-3">
          {children}
        </form>
      </div>

      <img
        src="/images/PontosTL.png"
        alt="Fatec Atibaia"
        className="w-[5%] md:w-[2%] max-w-[30px] absolute bottom-4 right-4"
      />
    </div>
  );
}
