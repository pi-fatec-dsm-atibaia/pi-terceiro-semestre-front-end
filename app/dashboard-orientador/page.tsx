import BackgroundWhiteRed from "@/src/components/backgroundWhiteRed";
import { Title2 } from "@/src/components/titles";

export default function DashBoardOrientador() {
    return (
        <div className="bg-(--c01)">

            <Title2>Selecione o tipo de serviço</Title2>

            <BackgroundWhiteRed>
                <div className="w-full z-10 sm:flex justify-center gap-[5%]">
                    {/*SOLICITAR*/}

                    <a href="#" className="relative h-[200px] sm:h-[500px] grid sm:w-[100%] max-w-[350px] justify-center max-sm:ml-auto max-sm:mr-auto bg-white max-sm:flex border-dashed border-4">
                        <div className="grid gap-3">
                            <img
                                src="/images/iconeSolicitarEquivalencia.png"
                                alt=""
                                className="max-sm:size-[100px] size-[192px] mt-[10px] place-self-center"
                            />
                            <div className="z-10 text-center ">
                                <strong className="sm:text-4xl text-2xl">Visualizar solicitações</strong>
                                <p className="mt-5 text-gray-500 sm:w-[250px] w-[150px]">
                                    Visualise todas os pedidos de equivalência dos alunos do curso orientado
                                </p>
                            </div>
                            <img
                                src="/images/iconeSetaVerde.png"
                                alt=""
                                className="place-self-center bottom-14 max-sm:hidden size-[60px] mt-[10px]"
                            />
                        </div>
                    </a>
                    {/*ACOMPANHAR*/}
                    <a href="#" className="relative h-[200px] sm:h-[500px] grid sm:w-[100%] max-w-[350px] justify-center max-sm:ml-auto max-sm:mr-auto bg-white max-sm:flex border-dashed border-4">
                        <div className="grid gap-3">
                            <img
                                src="/images/iconeConsultarEquivalencia.png"
                                alt=""
                                className="max-sm:size-[100px] size-[192px] mt-[10px] place-self-center"
                            />
                            <div className="z-10 text-center ">
                                <strong className="sm:text-4xl text-2xl">Bloqueado</strong>
                                <p className="mt-5 text-gray-500 sm:w-[250px] w-[150px]">
                                    Área em desenvolvimento
                                </p>
                            </div>
                            <img
                                src="/images/iconeSetaAzul.png"
                                alt=""
                                className="place-self-center bottom-14 max-sm:hidden size-[60px]"
                            />
                        </div>
                    </a>
                </div>
            </BackgroundWhiteRed>
        </div>
    );
}
