import BackgroundGradient from "@/src/components/backgroundGradient";
import EquivalenciaForm from "@/src/components/equivalenciaForm";

// Este é o Server Component da sua rota
export default function EquivalenciasPage() {
  return (
    <BackgroundGradient>
      {/* Adicione um padding horizontal ao contêiner principal para "empurrar" o conteúdo */}
      <div className="bg-red-section pt-10 pb-20 px-4 sm:px-16 mb-0">
        <h1 className="text-3xl font-bold text-black my-0">
          Selecione o tipo de equivalência.
        </h1>

        <div className="container mx-auto">
          {/* Remova os mx-35 e mx-45 dos títulos e deixe o container cuidar do alinhamento */}
          <h2 className="text-4xl font-extrabold text-black mb-10">
            SOLICITAÇÃO DE ESTÁGIO DE EQUIVALÊNCIA
          </h2>

          <div className="flex justify-center">
            <EquivalenciaForm />
          </div>
        </div>
      </div>
    </BackgroundGradient>
  );
}
