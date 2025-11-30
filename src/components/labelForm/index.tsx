interface LabelFormProps {
  children: React.ReactNode;
}

export function LabelForm({ children }: LabelFormProps) {
  return <label className="font-semibold">{children}</label>;
}
