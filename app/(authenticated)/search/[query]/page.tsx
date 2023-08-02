"use client";

import { CardCommunity } from "@/src/components/CardCommunity";
import { SearchForm } from "@/src/components/SearchBar";
import { generalRequest } from "@/src/functions/generalRequest";
import { ICommunity, IUser } from "@/src/interfaces/interface";
import { useEffect, useState } from "react";

export default function SearchCommunity() {
    const [auth, setAuth] = useState<IUser | null>(null);
    const [communities, setCommunities] = useState<ICommunity[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value: string) => {
        setSearchValue(value);
        console.log("Realizar a busca com o valor:", value);
    };

    useEffect(() => {
        async function getCommunities() {
            const community: ICommunity[] = await generalRequest("/api/c/");
            // rota para obter dad
            // const user: IUser = await generalRequest("/api/c/");
            setCommunities(community);
            setLoading(true);
        }
        
        getCommunities();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 p-4 bg-light-secondary dark:bg-dark-tertiary">
            <SearchForm onSearch={handleSearch} value={searchValue}/>
            <div className="w-full h-full p-4 overflow-auto rounded-lg bg-light-tertiary dark:bg-transparent">
                <div className="grid w-full h-full grid-cols-5 gap-3">
                    {
                        loading 
                            ? (
                                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                </svg>
                            ) : (
                                communities?.map((community) =>(
                                    <CardCommunity
                                        key={community.id}
                                        page={`/c/${community.id}`}
                                        community={community}
                                        variantButton="success"
                                    />
                                ))
                        
                        
                            )}
                </div>
            </div>
        </div>
    );
}
