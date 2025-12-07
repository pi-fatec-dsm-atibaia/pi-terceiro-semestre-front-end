interface TitleProps {
  children: React.ReactNode;
}

export function Title1({ children }: TitleProps) {
  return (
    <h1
      className="
        absolute
        left-1/2 -translate-x-1/2
        text-3xl sm:text-4xl text-gray-900 font-bold
        max-lg:hidden
        -top-[45px] sm:-top-[50px]
        z-10
        w-fit
      "
    >
      {children}
    </h1>
  );
}

export function Title2({ children }: TitleProps) {
  return (
    <h1
      className="
        absolute
        left-1/2 top-2 -translate-x-1/2
        text-3xl sm:text-4xl text-white md:text-gray-900 font-bold
        z-20
        mt-[20px] sm:mt-[35px] 
        w-fit
      "
    >
      {children}
    </h1>
  );
}
