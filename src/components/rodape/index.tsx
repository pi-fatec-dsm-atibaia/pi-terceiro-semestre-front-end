import Image from 'next/image';
 
export default function Rodape(){
    return(
    <footer className="bg-black">
      <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
        <div className="grid grid-cols-3 justify-evenly">
          <section className="flex items-center justify-center">
            <Image
              src="/images/logo_fatec_br.png"
              width={70}
              height={0}
              alt="Logo FATEC"
            />
          </section>
          <section className="text-white grid gap-3 items-center justify-center">
            <h1 className='font-bold'>CONTATO</h1>
            <ul className="grid gap-3 text-xs">
              <li><p>(11)4402-1047</p></li>
              <li><p>teste@gmail.com</p></li>
              <li><hr className="border-gray-700"/></li>
              <li><p>Avenida Jerônimo de Camargo, 421 
              Caetetuba, Atibaia - SP</p></li>
              <li><hr className="border-gray-700"/></li>
              <li>
                <Image
                src="/instagram-white.svg"
                width={25.6}
                height={0}
                alt="Visitar Instagram"
                />
              </li>
            </ul>
          </section >
          <section className="text-white grid items-center justify-center p-5">
            <Image
                src="/images/logo-rodape-gov-sp.png"
                width={150}
                height={0}
                alt="Logo Governo de São Paulo"
            />
            <ul className="grid gap-3 text-xs">
              <li>SP.GOV</li>
              <li>Centro Paula Souza</li>
              <li>FATEC Atibaia</li>
            </ul>
          </section>
        </div>  
      </div>
    </footer>
    );
}
