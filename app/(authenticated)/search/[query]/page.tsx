"use client";

import { CardCommunity } from "@/src/components/CardCommunity";
import { SearchForm } from "@/src/components/SearchBar";
import { generalRequest } from "@/src/functions/generalRequest";
import { ICommunity, IUser } from "@/src/interfaces/interface";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../layout";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export default function SearchCommunity() {
    const [communities, setCommunities] = useState<ICommunity[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const userContext = useContext(UserContext);
    
    const userData = userContext?.userData;

    const handleSearch = (value: string) => {
        setSearchValue(value);
        console.log("Realizar a busca com o valor:", value);
    };

    useEffect(() => {
        async function getCommunities() {
            const community: ICommunity[] = await generalRequest("/api/c/");
            setCommunities(community);
            setLoading(false);
        }
        
        getCommunities();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 p-4 bg-light-secondary dark:bg-dark-tertiary">
            <div className="w-full">
                <SearchForm onSearch={handleSearch} value={searchValue}/>
            </div>
            <div className="w-full h-full overflow-auto rounded-lg bg-light-tertiary dark:bg-dark-primary">
                {
                    loading 
                        ? (
                            <div>
                                
                                <div className="grid w-[97%] h-[calc(100%-32px)] grid-cols-5 gap-x-6 gap-y-4 p-4">
                                    <div className="h-[255px] w-full bg-light-primary dark:bg-dark-secondary animate-pulse rounded-md"></div>   
                                    <div className="h-[255px] w-full bg-light-primary dark:bg-dark-secondary animate-pulse rounded-md"></div>   
                                    <div className="h-[255px] w-full bg-light-primary dark:bg-dark-secondary animate-pulse rounded-md"></div>   
                                    <div className="h-[255px] w-full bg-light-primary dark:bg-dark-secondary animate-pulse rounded-md"></div>   
                                    <div className="h-[255px] w-full bg-light-primary dark:bg-dark-secondary animate-pulse rounded-md"></div>   
                                    <div className="h-[255px] w-full bg-light-primary dark:bg-dark-secondary animate-pulse rounded-md"></div>   
                                    <div className="h-[255px] w-full bg-light-primary dark:bg-dark-secondary animate-pulse rounded-md"></div>   
                                    <div className="h-[255px] w-full bg-light-primary dark:bg-dark-secondary animate-pulse rounded-md"></div>   
                                </div>
                            </div>
                        )    : (
                            
                            <ScrollArea.Root
                                className="w-full h-full overflow-hidden"
                                type="always"
                            >
                                <ScrollArea.Viewport className="w-full h-[calc(100%-16px)] rounded-md">
                                    <div className="grid w-[97%] h-full grid-cols-5 gap-x-6 gap-y-4 p-4">
                                        {communities?.map((community) =>(
                                            <div key={community._id} className="w-full drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
                                                <CardCommunity
                                                    page={`/c/${community.name}`}
                                                    community={community}
                                                    isMember={
                                                        userData?.communities.find((userCommunity) => userCommunity.id == community._id) ?
                                                            true :
                                                            false
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar
                                    className="flex select-none touch-none p-0.5 mr-2 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                                    orientation="vertical"
                                >
                                    <ScrollArea.Thumb className="flex-1 bg-light-secondary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] dark:bg-dark-secondary" />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Corner className="bg-black" />
                            </ScrollArea.Root>
                            
                        )
                }
            </div>
        </div>
    );
}
