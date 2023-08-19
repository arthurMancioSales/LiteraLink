import { Button } from "@/src/components/Button";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import { Logo } from "@/src/components/Logo";
import { Toggle } from "@/src/components/Toggle";
  
export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center px-20 py-2 bg-light-tertiary h-[62px] dark:bg-dark-secondary">
                <Logo />
                <div className="flex items-center gap-2 dark:text-dark-text">
                    <Toggle />
                    <Button redirectTo="/sign-in" icon={<BsFillPersonFill size={15} />} variant="secondary">Entrar</Button>
                    <Button redirectTo="/sign-up" variant="info">Cadastrar</Button>
                </div>
            </div>
            <div className="flex items-center justify-between h-full px-20 bg-cover bg-home dark:bg-home-dark">
                <div className="flex flex-col w-2/4 gap-8 dark:text-dark-text">
                    <p className="text-5xl font-bold text-justify w-[450px]">Desperte o Leitor em Você!</p>
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-justify indent-4">Prepare-se para uma aventura que começa nas páginas dos livros. Convidamos você a despertar o leitor interior e descobrir o prazer da leitura. Aprenda, sonhe, divirta-se e explore uma variedade de gêneros que se encaixam nos seus interesses.</p>
                        <p className="font-medium text-justify indent-4">O hábito da leitura não apenas expande seu conhecimento, mas também alimenta sua criatividade. Abra um livro, mergulhe nas palavras e deixe a jornada começar.</p>
                    </div>
                </div>
                <div className="h-[400px] w-[400px] relative">
                    <Image className="object-contain" src="/images/home/image-home.svg" alt="" fill priority />
                </div>
            </div>
        </div>
    );
}
