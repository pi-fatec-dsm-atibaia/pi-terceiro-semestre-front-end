import Image from "next/image";

export default function Cabecalho(){
    return(
        <header className="bg-black flex justify-center pt-2.5">
            <Image
              src="/images/logo_fatec_br.png"
              width={70}
              height={0}
              alt="Logo FATEC"
            />
        </header>
    );
}