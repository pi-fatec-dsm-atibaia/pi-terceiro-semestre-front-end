interface FormProps {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <div
      className="bg-white rounded-2xl flex flex-col sm:flex-row md:overflow-hidden mx-auto w-full max-w-[1200px] md:w-[80%] sm:h-auto sm:min-h-[55vh] sm:max-h-[70vh]
 shadow relative max-sm:overflow-auto"
    >
      {/* Lado Esquerdo */}
      <div className="max-md:hidden md:w-auto md:max-w-[50%]">
        <img
          src="/images/ciemIII.jpeg"
          alt="Fatec Atibaia"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Lado Direito */}
      <div className="w-full md:w-auto p-5 mx-auto md:overflow-y-auto flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="space-y-3  flex flex-col items-center"
        >
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
