"use client";

import { Accordion } from "@/src/components/Accordion";
import { Button } from "@/src/components/Button";
import { CardBooks } from "@/src/components/CardBooks";
import { Sidebar } from "@/src/components/Sidebar";
import { UserGoals } from "@/src/components/UserGoals";
import { AiFillAndroid } from "react-icons/ai";

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
        },
        {
            id: 3,
            name: "Teste2"
        },
        {
            id: 4,
            name: "Teste2"
        }
    ];

    return (
        <>
            <CardBooks title="Título" description="Capítulos" progress={7} total={14}/>
            <CardBooks description="Capítulos" progress={7} total={14} onClick={() => console.log("Clicou")} variant="secondary"/>
            <Button onClick={apiFetch}>Fetch</Button>
            <Sidebar user="Usuário" imageUser="/images/image.jpg" communities={communities}/>
            <Accordion
                readingBooks={[
                    {
                        id: 1,
                        title: "Livro",
                        chaptersRead: 7,
                        chaptersTotal: 14,
                    },
                    {
                        id: 1,
                        title: "Livro2",
                        chaptersRead: 4,
                        chaptersTotal: 14,
                    }
                ]}
            />
            <UserGoals
                icon={<AiFillAndroid size={50}/>}
                value={99}>
                    Maior sequência
            </UserGoals>
        </>
    );
}
