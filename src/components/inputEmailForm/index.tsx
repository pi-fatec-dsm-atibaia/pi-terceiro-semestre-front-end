interface InputFormProps {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function InputEmailForm({ id, placeholder, value, onChange }: InputFormProps) {
  return (
    <input
      type="email"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)"
    />
  );
}
