interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return (
    <h1 className="text-3xl sm:text-4xl text-gray-900 font-bold absolute -top-[60px] inset-x-0 sm:left-[10%] z-10">
      {children}
    </h1>
  );
}
