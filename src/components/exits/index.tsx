interface ExitProps {
  href: string;
  children: React.ReactNode;
}

export default function Exits({ children, href }: ExitProps) {
  return (
    <a
      href={href}
      className="flex justify-center underline decoration-blue-500"
    >
      {children}
    </a>
  );
}
