interface SelectFormProps {
  id: string,
  placeholder?: string,
  children: React.ReactNode;
}

export function SelectForm({ id, children }: SelectFormProps) {
  return (
    <select 
      id={id}
      className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)">
       {children}
    </select>
  );
}
