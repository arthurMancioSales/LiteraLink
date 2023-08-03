"use client";

import { ICommunity } from "@/src/interfaces/interface";
import { Avatar } from "../Avatar";
import { useEffect, useState } from "react";

interface PropTypes {
    communityURL: string;
}

export function AsideCommunity({communityURL}: PropTypes) {
    const [communityData, setCommunityData] = useState<ICommunity | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUserData() {
            if (communityURL != communityData?.name) {
                const req = await fetch(`/api/c/${communityURL.replace(/%20/g, " ")}`, {
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    cache: "no-store" 
                });
    
                const response = await req.json();
                const community: ICommunity = response.data;
                
                setCommunityData(community);
                setLoading(false);
                
                return;
            }
        }

        getUserData();
    }, []);
    
    return (
        <>
            <aside className="flex flex-col gap-4 p-4 items-center rounded-lg bg-light-tertiary w-[350px] dark:bg-dark-primary dark:text-dark-text">
                <div className="flex items-center justify-between w-full">
                    <p className="text-2xl font-bold">{communityData?.name}</p>
                    <p>{status}</p>
                </div>
                <div className="flex flex-col items-center gap-3 text-center">
                    <Avatar src={communityData?.image} size={125}/>
                </div>
                {communityData?.favoriteBook ? 
                    <div className="flex flex-col w-full gap-2 p-4 rounded-lg bg-light-primary dark:bg-dark-secondary">
                        <p className="text-lg font-medium">Livro favorito</p>
                        <p>{communityData?.favoriteBook}</p>
                    </div>
                    :
                    ""
                }
                <div className="flex flex-col w-full h-full gap-2 p-4 rounded-lg bg-light-primary dark:bg-dark-secondary">
                    <p className="text-lg font-medium">Descrição</p>
                    <p className="truncate">{communityData?.description}</p>
                </div>
            </aside>
        </>
    );
}
