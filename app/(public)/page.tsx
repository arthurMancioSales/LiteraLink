"use client";

import { Button } from "@/src/components/Button";
import { useState } from "react";


import { UserGoals } from "@/src/components/UserGoals";
import { AiFillAndroid } from "react-icons/ai";
import { SearchForm } from "@/src/components/SearchBar";

export default function Home() {
    const [auth, setAuth] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value: string) => {
        setSearchValue(value);
        console.log("Realizar a busca com o valor:", value);
    };
    
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
        <>
            <p>home</p>
            {auth ? <p>Logado</p> : <p>Não logado</p> }
            <Button onClick={apiFetch}>Login</Button>
            <Button redirectTo="/dashboard">Dashboard</Button>

            <UserGoals
                icon={<AiFillAndroid size={50}/>}
                value={99}>
                    Maior sequência
            </UserGoals>
            <SearchForm onSearch={handleSearch} value={searchValue}/>
        </>
    );
}
