import BackgroundGradient from "@/src/components/backgroundGradient";
import { EquivalenciaForm } from "@/src/components/equivalenciaForm";

// Este é o Server Component da sua rota
export default function EquivalenciasPage() {
  return (
    <>
      <BackgroundGradient>
        <div className="bg-red-section mb-0">
          {/* Classe para a seção vermelha da esquerda */}
          <h1 className="text-3xl font-bold text-black mx-45 my-0">
            Selecione o tipo de equivalência.
          </h1>
          {/* Aumente o valor de 'mb-' para aumentar o espaço abaixo do subtítulo. */}
          <div className="container mx-auto px-4 mb-0">
            <h2 className="text-4xl font-extrabold text-black mb-10 mx-35">
              SOLICITAÇÃO DE ESTÁGIO DE EQUIVALÊNCIA
            </h2>
            <div className="flex justify-center">
              {/* O formulário principal é importado como um Client Component (por precisar de estado) */}
              <EquivalenciaForm />
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </>
  );
}
