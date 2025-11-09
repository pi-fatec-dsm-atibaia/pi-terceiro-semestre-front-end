import BackgroundGradient from "@/src/components/backgroundGradient";
import Form from "@/src/components/form";

export default function CadastroCurso() {
  return (
  <div className="mx-auto bg-(--c01)">

        <h1
          className={
            "text-3xl sm:text-5xl text-gray-900 font-bold absolute top-6 sm:top-2 left-2.5 sm:left-10 z-10"
          }
        >
          Cadastro de Curso
        </h1>
    <BackgroundGradient>
      <div className="relative flex flex-col sm:px-8 mx-auto">
        <Form>
          <form className="space-y-5 items-center p-1.5 sm:p-6 ">
            <div className="flex">
              <div className="mt-1.5 w-1 h-3.5 mr-1 bg-red-700"></div>
              <h3 className="font-bold">Dados do curso</h3>
            </div>
            <div className="space-x-3 grid sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold">Nome:</label>
                <input
                  className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)"
                  type="text"
                  id="nome"
                  placeholder="Informe o nome do curso"
                />
              </div>
              <div>
                <label className="font-semibold">Código:</label>
                <input
                  className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)"
                  type="text"
                  id="codigo"
                  placeholder="Informe o código abreviado"
                />
              </div>
            </div>

            <label className="font-semibold">Periodo:</label>
            <select className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)">
              <option value="">--Selecione uma opção--</option>
              <option value="matutino">Matutino</option>
              <option value="vespertino">Vespertino</option>
              <option value="noturno">Noturno</option>
            </select>

            <label className="font-semibold">Semestres:</label>
            <input
              className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)"
              type="number"
              id="semestres"
              placeholder="Informe quantos semestres tem o curso"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 sm:h-10 w-[100px] sm:w-[200px] rounded-md block mx-auto mt-4"
              type="submit"
            >
              Cadastrar Curso
            </button>
          </form>
        </Form>
      </div>
    </BackgroundGradient>
    </div>
  );
}
