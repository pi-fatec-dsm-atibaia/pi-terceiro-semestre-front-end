interface TitleProps {
  children: React.ReactNode;
}

export function Title1({ children }: TitleProps) {
  return (
    <h1 className="absolute text-3xl sm:text-4xl text-gray-900 font-bold -top-[60px] inset-x-0 sm:left-[10%] z-10">
      {children}
    </h1>
  );
}

export function Title2({ children }: TitleProps) {
  return (
    <h1 className="absolute text-3xl sm:text-4xl text-gray-900 font-bold sm:mt-[50px] mt-[35px] ml-5 z-10">
      {children}
    </h1>
  );
}
