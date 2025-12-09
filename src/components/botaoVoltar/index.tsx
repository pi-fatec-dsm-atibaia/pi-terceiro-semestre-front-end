"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BotaoVoltar() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-12 sm:top-3 left-3 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-md transition"
    >
      <ArrowLeft size={18} />
      <p className="max-sm:hidden">Voltar</p>
    </button>
  );
}

export function BotaoVoltar2() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-3 left-3 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-md transition"
    >
      <ArrowLeft size={18} />
      <p>Voltar</p>
    </button>
  );
}
