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
        absolute inset-0 mx-auto
        top-0 sm:top-2
        text-[clamp(1.2rem,5vw,3rem)] max-sm:max-text-2xl sm:text-4xl text-white md:text-gray-900 font-bold whitespace-nowrap 
        z-20
        mt-[10px] sm:mt-[35px] 
        w-fit
      "
    >
      {children}
    </h1>
  );
}
