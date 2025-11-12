interface ButtonSubmitFormProps {
  children: React.ReactNode;
}

export function ButtonSubmitForm({ children }: ButtonSubmitFormProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 sm:h-10 w-[100px] sm:w-[200px] rounded-md block mx-auto mt-4"
      type="submit"
    >
      {children}
    </button>
  );
}
