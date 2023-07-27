"use client";

import { CardCommunity } from "@/src/components/CardCommunity";
import { SearchForm } from "@/src/components/SearchBar";
import { useState } from "react";

const communities = [
    {
        id: 1,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 2,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 3,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 4,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 5,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 6,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 7,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 8,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 9,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 10,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 11,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 12,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
    {
        id: 13,
        name: "Teste",
        image: "/images/image.jpg",
        auth: "Autor",
        category: "teste",
        gender: "teste",
    },
];

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
        <div className="flex flex-col items-center justify-center gap-4 h-screen w-screen p-4 bg-light-secondary">
            <SearchForm onSearch={handleSearch} value={searchValue}/>
            <div className="h-full w-full p-4 rounded-lg overflow-auto bg-light-tertiary">
                <div className="h-full w-full grid grid-cols-5 gap-3">
                    {
                        communities.map((community) =>(
                            <CardCommunity key={community.id} community={community}/>
                        ))
                    }
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

// flex flex-col items-center justify-center gap-4

// grid grid-cols-5
