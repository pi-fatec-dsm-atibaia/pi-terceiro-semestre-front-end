interface InputFormProps {
  id: string;
  placeholder?: string;
}

export default function InputTextForm({ id, placeholder }: InputFormProps) {
  return (
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)"
    />
  );
}
