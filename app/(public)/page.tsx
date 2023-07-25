"use client";

import { Button } from "@/src/components/Button";
import { CardBooks } from "@/src/components/CardBooks";
import { Sidebar } from "@/src/components/Sidebar";

export default function Home() {
    function apiFetch() {
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": "edu@gmail.com",
                "password": "senha123"
            })
        });
    }

    const communities = [
        {
            id: 1,
            name: "Teste"
        },
        {
            id: 2,
            name: "Teste2"
        }
    ];

    return (
        <>
            <CardBooks title="Título" description="Capítulos" progress={7} total={14}/>
            <CardBooks description="Capítulos" progress={7} total={14} onClick={() => console.log("Clicou")} variant="secondary"/>
            <Button onClick={apiFetch}>Fetch</Button>
            <Sidebar user="Usuário" imageUser="/images/image.jpg" communities={communities}/>
        </>
    );
}
