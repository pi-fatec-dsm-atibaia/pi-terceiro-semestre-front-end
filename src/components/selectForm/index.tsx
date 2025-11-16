interface SelectFormProps {
  children: React.ReactNode;
}

export function SelectForm({ children }: SelectFormProps) {
  return (
    <select className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)">
      {children}
    </select>
  );
}
