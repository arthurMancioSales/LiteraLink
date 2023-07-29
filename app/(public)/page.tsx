"use client";

import { Button } from "@/src/components/Button";
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
            <div className="flex justify-between items-center px-20 bg-light-tertiary h-[62px]">
                <Link href="/">LiteraLink</Link>
                <div className="flex gap-2">
                    <Link href="/dashboard">Entrar</Link>
                    <div>Não sei</div>
                </div>
            </div>
            <div className="flex justify-around items-center h-full px-20 bg-light-secondary">
                <div>
                    <p className="text-7xl mb-4">Título</p>
                    <p className="text-justify">Textkfjsdkfjsdkfj sdjfksddfsdfdsfsdfsd fdsfsdfdsfdsfs dfsdfdssf gdsgdfgghfg hfghfghfghf ghfghgf hfghf jdkajsdkjasd dsjkdaskdja kdkasjdkajdkaj dksajdkasjdkasjd askdasjkdsajdkasj kdjask djask jdaskjdkasjdakslorem50</p>
                </div>
                <div className="h-[400px] w-[400px] relative">
                    <Image className="object-contain" src="/images/home/index.png" alt="" fill priority/>
                </div>
            </div>
            {auth ? <p>Logado</p> : <p>Não logado</p> }
            <Button onClick={apiFetch}>Login</Button>
            <Button redirectTo="/dashboard">Dashboard</Button>
        </div>
    );
}
