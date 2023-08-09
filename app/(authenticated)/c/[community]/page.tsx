"use client";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useContext, useEffect, useState } from "react";
import { ICommunity } from "@/src/interfaces/interface";
import { CardUserCommunity } from "@/src/components/CardUserCommunity";
import { TextLoading } from "@/src/components/Loaders/TextLoading";
import { UserContext } from "../../layout";
import { ImageLoading } from "@/src/components/Loaders/ImageLoading";
import { Avatar } from "@/src/components/Avatar";
import { generalRequest } from "@/src/functions/generalRequest";
import { useWebSocket } from "next-ws/client";


export default function CommunityChat({ params }: { params: { community: string } }) {
    const [communityData, setCommunityData] = useState<ICommunity | null>(null);
    const [loadingCommunity, setLoadingCommunity] = useState(true);
    
    const userContext = useContext(UserContext);
    
    const userData = userContext?.userData;
    const loadingUser = userContext ? userContext.loading : false;
    
    const memberOfCommunity = userData?.communities ? userData?.communities.find((community) => community.name == communityData?.name) : false;
    
    const ws = new WebSocket("ws://localhost:3000/api"); 
    
    useEffect(() => {
        async function getCommunityData() {
            
            const community: ICommunity = await generalRequest(`/api/c/${params.community.replace(/%20/g, " ")}`);
            
            setCommunityData(community);
            setLoadingCommunity(false);
        }
        
       
        getCommunityData();
    }, [params.community]);
    
    return (
        <div className="flex w-full max-h-screen px-4 py-4 bg-light-secondary dark:bg-dark-tertiary overflow-clip">
            {/* <button onClick={() => ws.send("oi")}></button> */}
            <div className="flex flex-col w-3/4 h-full gap-4 mr-2">
                
                <Tabs.Root
                    className="flex flex-col w-full h-full"
                    defaultValue="chat"
                >
                    <Tabs.List className="flex shrink-0" aria-label="Manage your account">
                        <Tabs.Trigger
                            className="px-5 py-2 w-fit flex items-center justify-center text-[15px] leading-none select-none rounded-t-md hover:text-brand dark:hover:text-brand dark:text-dark-text data-[state=active]:text-brand border-none border-b-2 dark:border-white border-black data-[state=active]:border-solid data-[state=active]:dark:bg-dark-primary data-[state=active]:bg-light-tertiary data-[state=active]:focus:relative outline-none cursor-default"
                            value="chat"
                        >
                        Chat   
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            className="px-5 py-2 w-fit flex items-center justify-center text-[15px] leading-none select-none rounded-t-md hover:text-brand dark:hover:text-brand dark:text-dark-text data-[state=active]:text-brand border-none border-b-2 dark:border-white border-black data-[state=active]:border-solid data-[state=active]:dark:bg-dark-primary data-[state=active]:bg-light-tertiary data-[state=active]:focus:relative outline-none cursor-default"
                            value="members"
                        >
                        Membros
                        </Tabs.Trigger>
                    
                    </Tabs.List>
                    <Tabs.Content
                        className="h-full outline-none grow rounded-b-md rounded-tr-md max-h-[calc(100%-35px)]"
                        value="chat"
                    >
                        <div className="flex flex-col w-full h-full gap-4 p-4 dark:bg-dark-primary bg-light-tertiary rounded-b-md rounded-tr-md">
                            <div className="flex w-full h-[calc(90%-8px)] bg-red-400">
                                <ScrollArea.Root 
                                    className="w-full h-full overflow-hidden"
                                    type="always"
                                >
                                    <ScrollArea.Viewport className="w-[96%] h-full max-h-full rounded flex flex-col mb-2">
                                        <div className="w-full h-fit">

                                        </div>
                                        {communityData?.members ? (
                                            communityData?.members.map((user) => (
                                                <CardUserCommunity key={user.id} imageUser={user.image} user={user.name}/>            
                                            ))
                                        ) : ""}
                                    </ScrollArea.Viewport>
                                    <ScrollArea.Scrollbar
                                        className="flex select-none touch-none p-0.5 mr-2 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                                        orientation="vertical"
                                    >
                                        <ScrollArea.Thumb id="scroll" className="flex-1 bg-light-tertiary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] dark:bg-dark-secondary" />
                                    </ScrollArea.Scrollbar>
                                    <ScrollArea.Corner className="bg-black" />
                                </ScrollArea.Root>
                            </div>
                            <div className="w-full h-[calc(10%-8px)] bg-red-400">
                                <input type="text" name="userMessage" id="userMessage" />
                            </div>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content
                        className="h-full outline-none grow rounded-b-md rounded-tr-md max-h-[calc(100%-35px)]"
                        value="members"
                    >
                        <div className="flex flex-col w-full h-full gap-4 p-4 rounded-md dark:bg-dark-primary bg-light-tertiary">
                            <div className="flex flex-col w-full h-full gap-4">
                                <p className="text-2xl dark:text-dark-text">Membros da comunidade</p>
                                <ScrollArea.Root 
                                    className="w-full h-full overflow-hidden"
                                    type="always"
                                >
                                    <ScrollArea.Viewport className="w-[95%] h-full max-h-full rounded flex flex-col mb-2">
                                        <div className="flex flex-col gap-4 pb-2 pr-2 ">
                                            {communityData?.members ? (
                                                communityData?.members.map((user) => (
                                                    <CardUserCommunity key={user.id} imageUser={user.image} user={user.name}/>            
                                                ))
                                            ) : ""}
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
                            </div>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
            <div className="flex w-1/4 h-full ml-2 overflow-hidden rounded-md bg-light-tertiary dark:bg-dark-primary">
                <aside className="flex flex-col items-center w-full gap-4 p-4 rounded-lg bg-light-tertiary dark:bg-dark-primary dark:text-dark-text">
                    <div className="flex items-center justify-between w-full">
                        {loadingCommunity ? <TextLoading /> : <p className="text-2xl font-bold">{communityData?.name}</p>}
                        {loadingUser ? <TextLoading /> : memberOfCommunity ? <p>sair</p> : <p>entrar</p>}
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center">
                        {loadingCommunity ? <ImageLoading size={125} /> : <Avatar src={communityData?.image} size={125} />}
                    </div>
                    <div className="flex flex-col w-full gap-2 p-4 rounded-lg bg-light-primary dark:bg-dark-secondary">
                        <p className="text-lg font-medium">Livro favorito</p>
                        {loadingCommunity ? <TextLoading /> : <p>{communityData?.favoriteBook}</p>}
                    </div>
                    <div className="flex flex-col w-full h-full gap-2 p-4 rounded-lg bg-light-primary dark:bg-dark-secondary">
                        <p className="text-lg font-medium">Descrição</p>
                        {loadingCommunity ? <TextLoading /> : <p className="truncate">{communityData?.description}</p>}
                    </div>
                </aside>
            </div>
        </div>
        
        
    );
}
