"use client";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useContext, useEffect, useState } from "react";
import { IChatContent, ICommunity, IWsEnterMessage, IWsSendMessage } from "@/src/interfaces/interface";
import { CardUserCommunity } from "@/src/components/CardUserCommunity";
import { TextLoading } from "@/src/components/Loaders/TextLoading";
import { UserContext } from "../../layout";
import { ImageLoading } from "@/src/components/Loaders/ImageLoading";
import { Avatar } from "@/src/components/Avatar";
import { generalRequest } from "@/src/functions/generalRequest";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { AiOutlineSend } from "react-icons/ai";
import ChatMessage from "@/src/components/ChatMessage";

export default function CommunityChat({ params }: { params: { community: string } }) {
    const [communityData, setCommunityData] = useState<ICommunity | null>(null);
    const [loadingCommunity, setLoadingCommunity] = useState(true);
    const [wsClient, setWsClient] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<IChatContent[] | null>(null);
    
    const userContext = useContext(UserContext);
    const userData = userContext?.userData;
    const loadingUser = userContext ? userContext.loading : false;
    
    const memberOfCommunity = userData?.communities ? userData?.communities.find((community) => community.name == communityData?.name) : false;
    
    useEffect(() => {
        
        async function getCommunityData() {
            
            const community: ICommunity = await generalRequest(`/api/c/${params.community.replace(/%20/g, " ")}`);
            
            setCommunityData(community);
            setLoadingCommunity(false);
        }
        
        getCommunityData();
        
        if (userData) {
            const host = window.location.host;
            const ws = new WebSocket(`ws://${host}/api`); 
            
            setWsClient(ws);
            
            const connection: IWsEnterMessage = {
                type: "enter",
                params: {
                    room: params.community,
                    profilePicture: userData.image || "",
                    username: userData.name,
                }
                
            };
            
            ws.addEventListener("open", () => {
                ws.send(JSON.stringify(connection));
            });
            
            ws.addEventListener("message", (jsonMessage: MessageEvent) => {
                const message: IWsSendMessage = JSON.parse(jsonMessage.data);

                const localMessage: IChatContent = {
                    message: message.params.message,
                    profilePicture: message.params.profilePicture,
                    username: message.params.username,
                    variant: message.params.variant,
                };
                console.log(message);
                setMessages((messages) => {
                    if (messages === null) {
                        return [localMessage];
                    } 

                    return [...messages, localMessage];
                });
            });
        }

    }, [params.community, userData]);

    const validationSchema = object({
        message: string().required("Não é possível enviar uma mensagem vazia")
    });

    const initialValues = {
        message: "",
    };
    
    return (
        <div className="flex w-full max-h-screen px-4 py-4 bg-light-secondary dark:bg-dark-tertiary overflow-clip">
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
                            <div className="flex w-full h-[calc(100%-56px)] bg-light-secondary dark:bg-dark-secondary rounded-md drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
                                <ScrollArea.Root 
                                    className="w-full h-full overflow-hidden"
                                    type="always"
                                >
                                    <ScrollArea.Viewport className="w-[96%] h-full rounded flex flex-col">
                                        <div className="flex flex-col w-full h-full gap-4 p-4 pr-0" id="chat">
                                            {messages?.map((message, index) => {
                                                
                                                return (
                                                    <ChatMessage
                                                        message={message}
                                                        key={`chat-${index}`}
                                                    ></ChatMessage>
                                                );
                                            })}
                                        </div>
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
                            <div className="flex w-full h-min">
                                <Formik
                                    onSubmit={(values, helpers) => {
                                        const message: IWsSendMessage = {
                                            type: "message",
                                            params: {
                                                message: values.message,
                                                profilePicture: userData?.image || "",
                                                username: userData?.name || "",
                                                variant: "reciever"
                                            }
                                        }; 
                                        
                                        wsClient?.send(JSON.stringify(message));

                                        helpers.resetForm();
                                        const localMessage: IChatContent = {
                                            message: message.params.message,
                                            profilePicture: message.params.profilePicture,
                                            username: message.params.username,
                                            variant: "sender",
                                        };
                                        setMessages((messages) => {
                                            if (messages === null) {
                                                return [localMessage];
                                            } 

                                            return [...messages, localMessage];
                                        });
                                    }}
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                >
                                    {(props) => (
                                        <Form 
                                            onSubmit={(e) => {
                                                e.preventDefault(); 
                                                props.handleSubmit(e);
                                            }}
                                            className="flex w-full h-full gap-2"
                                        >
                                            <div className="flex flex-col w-full">
                                                <Field type="text" name="message" placeholder="Escreva aqui" className={"w-full h-10 px-2 rounded-md bg-light-secondary dark:bg-dark-secondary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] resize-none dark:text-dark-text"} />
                                            </div>
                                            <button type="submit" className="flex items-center justify-center w-10 h-10 rounded-md bg-light-secondary dark:bg-dark-secondary group drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-100"> <AiOutlineSend className="duration-100 group-hover:text-brand dark:text-dark-text" size={25}></AiOutlineSend> </button>
                                        </Form>
                                    )}
                                </Formik>
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
