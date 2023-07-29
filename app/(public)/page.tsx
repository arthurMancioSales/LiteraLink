"use client";

import { Button } from "@/src/components/Button";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [auth, setAuth] = useState(false);
    
    async function apiFetch() {
        const req = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": "edu@gmail.com",
                "password": "senha123"
            })
        });

        const auth = await req.json();
        console.log(auth);

        if (req.ok) {
            setAuth(true);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center px-20 py-2 bg-light-tertiary h-[62px]">
                <Link href="/">LiteraLink</Link>
                <div className="flex gap-2 items-center">
                    <Button redirectTo="/sign-in" icon={<BsFillPersonFill size={15}/>} variant="secondary">Entrar</Button>
                    <Button redirectTo="/sign-up" variant="info">Cadastrar</Button>
                </div>
            </div>
            <div className="flex justify-around items-center h-full px-20 bg-home">
                <div className="w-[400px]">
                    <p className="text-7xl mb-4">Título</p>
                    <p className="text-justify">Textkfjsdkfjsdkfj sdjfksddfsdfdsfsdfsd fdsfsdfdsfdsfs dfsdfdssf gdsgdfgghfg hfghfghfghf ghfghgf hfghf jdkajsdkjasd dsjkdaskdja kdkasjdkajdkaj dksajdkasjdkasjd askdasjkdsajdkasj kdjask djask jdaskjdkasjdakslorem50</p>
                </div>
                <div className="h-[400px] w-[400px] relative">
                    <Image className="object-contain" src="/images/home/imageHome.png" alt="" fill priority/>
                </div>
            </div>
            {auth ? <p>Logado</p> : <p>Não logado</p> }
            <Button onClick={apiFetch}>Login</Button>
            <Button redirectTo="/dashboard">Dashboard</Button>
        </div>
    );
}
