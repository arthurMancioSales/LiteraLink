"use client";

import { CardCommunity } from "@/src/components/CardCommunity";
import { SearchForm } from "@/src/components/SearchBar";
import { generalRequest } from "@/src/functions/generalRequest";
import { ICommunity } from "@/src/interfaces/interface";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../layout";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { GenericModal } from "@/src/components/Modal/GenericModal";

export default function SearchCommunity() {
    const [communities, setCommunities] = useState<ICommunity[]>([]);
    const [loading, setLoading] = useState(true);
    const [openModalMessageError, setOpenModalMessageError] = useState(false);
    const [messageError, setMessageError] = useState("");

    const userContext = useContext(UserContext);
    
    const userData = userContext?.userData;
    const updateUser = userContext?.updateUser;

    useEffect(() => {
        async function getCommunities() {
            setLoading(true);
            const community: ICommunity[] | null = await generalRequest("/api/c");

            if(!community) {
                setCommunities([]);
            } else {
                setCommunities(community);
            }

            setLoading(false);
        }
        
        getCommunities();
    }, []);

    if(loading) {
        return(
            <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 p-4 bg-light-secondary dark:bg-dark-tertiary">
                <div className="w-full">
                    <div className="h-[53px] w-full bg-light-tertiary dark:bg-dark-secondary rounded-md"></div>
                </div>
                <div className="w-full h-full overflow-auto rounded-lg bg-light-tertiary dark:bg-dark-primary">
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
                </div>
            </div>
        );
    }

    const handleSearch = async (value: string) => {
        const communitySearch = await generalRequest(`/api/search/${value}`);
        
        if(value === "") {
            const community: ICommunity[] | null = await generalRequest("/api/c");
            if(!community) {
                setCommunities([]);
            } else {
                setCommunities(community);
            }
            return;                       
        }
        setCommunities(communitySearch.community);
    };

    async function participationCommunity(nameCommunity: string, isMember: boolean) {
        setLoading(true);
        if(isMember) {
            const response = await generalRequest("/api/community/remove-member", {name: nameCommunity}, "DELETE");
    
            if(response?.error) {
                setMessageError(response.error);
                setOpenModalMessageError(true);
            }
        } else {
            const response = await generalRequest("/api/community/add-member", {name: nameCommunity}, "POST");

            if(response?.error) {
                setMessageError(response.error);
                setOpenModalMessageError(true);
            }
        }
        if(updateUser) updateUser();
    
        setLoading(false);
    }

    function renderCommunities() {
        if (!communities.length) {
            return (
                <div className="flex items-center justify-center h-full dark:text-dark-text">
                    <p>Não possui comunidades cadastradas ou a sua pesquisa não foi encontrada</p>                
                </div>
            );
        }

        function verifyIsMember(communityId: string) {
            if(!userData?.communities) {
                return false;
            }

            const isMember = userData.communities.find((userCommunity) => userCommunity.id == communityId);

            if(!isMember) return false;
            
            return true;
        }

        return (
            <ScrollArea.Root
                className="w-full h-full overflow-hidden"
                type="always"
            >
                <ScrollArea.Viewport className="w-full h-[calc(100%-16px)] rounded-md">
                    <div className="grid w-[97%] h-full grid-cols-5 gap-x-6 gap-y-4 p-4">
                        {communities.map((community) =>(
                            <div key={community._id} className="w-full drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
                                <CardCommunity
                                    page={`/c/${community.name}`}
                                    community={community}
                                    handleCommunity={participationCommunity}
                                    isMember={verifyIsMember(community._id)}
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
        );        
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 p-4 bg-light-secondary dark:bg-dark-tertiary">
            <div className="w-full">
                <SearchForm onSearch={handleSearch}/>
            </div>
            <div className="w-full h-full overflow-auto rounded-lg bg-light-tertiary dark:bg-dark-primary">
                {renderCommunities()}
            </div>
            {openModalMessageError && <GenericModal styleSize={{textAlign: "center"}} onClose={() => setOpenModalMessageError(false)} title="Aviso">{messageError}</GenericModal>}
        </div>
    );
}
