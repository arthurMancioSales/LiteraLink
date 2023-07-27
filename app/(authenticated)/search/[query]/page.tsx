"use client";

import { Button } from "@/src/components/Button";
import { SearchForm } from "@/src/components/SearchBar";
import { useState } from "react";

export default function SearchCommunity() {
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
        <div className="flex flex-col items-center justify-center gap-4 w-full p-4 bg-light-secondary">
            <SearchForm onSearch={handleSearch} value={searchValue}/>
            <div className="h-full w-full p-4 rounded-lg bg-light-tertiary">
                <div className="bg-blue-500">
                    Teste
                </div>
            </div>
        </div>
    );
}

// <>
//     <p>Search</p>
//     {auth ? <p>Logado</p> : <p>Não logado</p> }
//     <Button onClick={apiFetch}>Login</Button>
// </>
