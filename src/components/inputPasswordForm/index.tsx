interface InputFormProps {
  id: string;
  placeholder?: string;
}

export default function InputPasswordForm({ id, placeholder }: InputFormProps) {
  return (
    <input
      type="password"
      id={id}
      placeholder={placeholder}
      className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)"
    />
  );
}
