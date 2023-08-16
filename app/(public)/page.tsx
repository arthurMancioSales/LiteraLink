import { Button } from "@/src/components/Button";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import { Logo } from "@/src/components/Logo";
  
export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center px-20 py-2 bg-light-tertiary h-[62px]">
                <Logo />
                <div className="flex gap-2 items-center">
                    <Button redirectTo="/sign-in" icon={<BsFillPersonFill size={15} />} variant="secondary">Entrar</Button>
                    <Button redirectTo="/sign-up" variant="info">Cadastrar</Button>
                </div>
            </div>
            <div className="flex justify-around items-center h-full px-20 bg-home bg-cover">
                <div className="w-[520px] bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] p-4 rounded-lg">
                    <p className="text-4xl text-justify font-bold mb-4">Conheça a Magia da Organização e Conecte-se com leitores inspiradores!</p>
                    <p className="text-justify">Bem-vindo(a) à nossa comunidade exclusiva de leitores dedicados, onde a organização ganha vida! Nossa plataforma foi desenvolvida para potencializar suas habilidades e ajudá-lo(a) a definir metas ambiciosas e alcançáveis, impulsionando-o(a) a atingir seu potencial máximo.</p>
                </div>
                <div className="h-[400px] w-[400px] relative">
                    <Image className="object-contain" src="/images/home/imageHome.png" alt="" fill priority />
                </div>
            </div>
        </div>
    );
}
