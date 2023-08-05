"use client";

import { Button } from "@/src/components/Button";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";
import { Logo } from "@/src/components/Logo";
import { generalRequest, statusHTTP } from "@/src/functions/generalRequest";
import { FormProgress } from "@/src/components/Modal/FormProgress";
import { FormAddBook } from "@/src/components/Modal/FormAddBook";
  
export default function Home() {
    const [auth, setAuth] = useState(false);
    const [openModal, setOpenModal] = useState(true);

    async function apiFetch() {
        const user = {
            email: "rick@gmail.com",
            password: "senha123"
        };

        const response = await generalRequest("/api/login", user, "POST");

        if (response !== statusHTTP.unauthorized) {
            setAuth(true);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center px-20 py-2 bg-light-tertiary h-[62px]">
                <Logo />
                <div className="flex gap-2 items-center">
                    <Button redirectTo="/sign-in" icon={<BsFillPersonFill size={15} />} variant="secondary">Entrar</Button>
                    <Button redirectTo="/sign-up" variant="info">Cadastrar</Button>
                </div>
            </div>
            <div className="flex justify-around items-center h-full px-20 bg-home">
                <div className="w-[520px] bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] p-4 rounded-lg">
                    <p className="text-4xl text-justify font-bold mb-4">Conheça a Magia da Organização e Conecte-se com leitores inspiradores!</p>
                    <p className="text-justify">Bem-vindo(a) à nossa comunidade exclusiva de leitores dedicados, onde a organização ganha vida! Nossa plataforma foi desenvolvida para potencializar suas habilidades e ajudá-lo(a) a definir metas ambiciosas e alcançáveis, impulsionando-o(a) a atingir seu potencial máximo.</p>
                </div>
                <div className="h-[400px] w-[400px] relative">
                    <Image className="object-contain" src="/images/home/imageHome.png" alt="" fill priority />
                </div>
            </div>
            {auth ? <p>Logado</p> : <p>Não logado</p>}
            <Button onClick={apiFetch}>Login</Button>
            <Button redirectTo="/dashboard">Dashboard</Button>
            <FormProgress isOpen={openModal}/>
            {/* <FormAddBook isOpen={openModal}/> */}
        </div>
    );
}
