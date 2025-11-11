import BackgroundGradient from "@/src/components/backgroundGradient";
import Form from "@/src/components/form";
import { Paragraph } from "@/src/components/paragraph";
import { Title } from "@/src/components/title";
import Image from "next/image";

export default function CadastroConta() {
  return (
    <div className="mx-auto bg-(--c01)">
        <BackgroundGradient>
          <div className="relative flex flex-col sm:px-8 mx-auto">
            <Form>
              <form className="space-y-5 items-center justify-center p-1.5 sm:p-6 ">

                <div className="flex">
                  <div className="mt-1.5 w-1 h-3.5 mr-1 bg-red-700"></div>
                  <h3 className="font-bold">Faça seu cadastro</h3>
                </div>

                <div>
                  <label className="font-semibold">E-mail:</label>
                  <input
                    className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)"
                    type="text"
                    id="email"
                    placeholder="Informe o seu e-mail"
                  />
                </div>
                <div>
                  <label className="font-semibold">Senha:</label>
                  <input
                    className="font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full bg-(--c01)"
                    type="password"
                    id="senha"
                    placeholder="Informe a sua senha"
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 sm:h-10 w-[100px] sm:w-[200px] rounded-md block mx-auto mt-4"
                  type="submit"
                >
                  Cadastrar
                </button>
              </form>
            </Form>
          </div>
        </BackgroundGradient>
        </div>
  );
}
