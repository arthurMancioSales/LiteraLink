"use client";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Toggle } from "../Toggle";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineSearch, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiSolidBookAdd, BiLogOut } from "react-icons/bi";
import { TbLayoutDashboard, TbProgress } from "react-icons/tb";
import { MdOutlinePeopleAlt } from "react-icons/md";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useContext, useState } from "react";
import { TextLoading } from "../Loaders/TextLoading";
import { UserContext } from "@/app/(authenticated)/layout";
import { FormProgress } from "../Forms/FormProgress";
import { FormAddBook } from "../Forms/FormAddBook";
import { FormAddCommunity } from "../Forms/FormAddCommunity";
import { FormUserConfig } from "../Forms/FormUserConfig";
import { generalRequest } from "@/src/functions/generalRequest";
import { CircleSkeleton } from "../Loaders/CircleSkeleton";
import { RectangleSkeleton } from "../Loaders/RectangleSkeleton";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const iconSize = 25;

    const userContext = useContext(UserContext);
    
    const userData = userContext?.userData;
    const loading = userContext ? userContext.loading : false;

    const [openModalProgress, setOpenModalProgress] = useState(false);
    const [openModalAddBook, setOpenModalAddBook] = useState(false);
    const [openModalAddCommunity, setOpenModalAddCommunity] = useState(false);
    const [openModalUserConfig, setOpenModalUserConfig] = useState(false);

    const navigate = useRouter();

    async function logout() {
        await generalRequest("/api/logout", {}, "POST");
        navigate.replace("/");                
    }

    if (loading) {
        return(
            <div className="flex flex-col min-w-[230px] w-[230px] max-w-[230px] p-4 gap-2 text-light-text bg-light-primary dark:text-dark-text dark:bg-dark-primary rounded-r-md max-h-screen">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <CircleSkeleton size={iconSize}/>
                        <CircleSkeleton size={iconSize}/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <>
                            <div className="rounded-full w-[120px] h-[120px] bg-light-secondary dark:bg-dark-secondary animate-pulse"></div>
                            <div className="relative flex justify-center w-full">
                                <TextLoading size="small"></TextLoading>
                                <div className="absolute bottom-0 right-0">
                                    <CircleSkeleton size={iconSize}/>
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="h-[45px]"><RectangleSkeleton/></div>
                        <div className="h-[45px]"><RectangleSkeleton/></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 py-2 border-solid border-y-2 border-light-text dark:border-dark-text">
                    <div className="h-[45px]"><RectangleSkeleton/></div>
                    <div className="h-[45px]"><RectangleSkeleton/></div>
                </div>
                <div className="flex flex-col gap-2 h-full">
                    <div className="flex justify-between">
                        <span>Comunidades</span>
                        <CircleSkeleton size={iconSize}/>
                    </div>
                    <div className="h-[45px]"><RectangleSkeleton/></div>
                    <div className="h-[45px]"><RectangleSkeleton/></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col min-w-[230px] w-[230px] max-w-[230px] p-4 gap-2 text-light-text bg-light-primary dark:text-dark-text dark:bg-dark-primary rounded-r-md max-h-screen">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <Toggle />
                        <div onClick={logout} className="text-red-600 cursor-pointer" title="Logout">
                            <BiLogOut size={iconSize} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <>
                            <Avatar src={userData?.image} size={120} />
                            <div className="relative flex justify-center w-full">
                                <p className="pt-3">{userData?.name}</p>
                                <IoIosSettings size={25} className="absolute bottom-0 right-0 transition-all cursor-pointer hover:rotate-180" onClick={() => setOpenModalUserConfig(true)}></IoIosSettings>
                            </div>
                        </>
                    </div>
                    <div className="">
                        <Button icon={<TbProgress size={iconSize} />} onClick={() => setOpenModalProgress(true)}>Atualizar Progresso</Button>
                        <Button icon={<BiSolidBookAdd size={iconSize} />} onClick={() => setOpenModalAddBook(true)}>Novo Livro</Button>
                    </div>
                </div>
                <div className="py-2 border-solid border-y-2 border-light-text dark:border-dark-text">
                    <Button icon={<TbLayoutDashboard size={iconSize} />} redirectTo="/dashboard">DashBoard</Button>
                    <Button icon={<AiOutlineSearch size={iconSize} />} redirectTo="/search">Pesquisar</Button>
                </div>
                <div className="h-full">
                    <div className="flex justify-between">
                        <span>Comunidades</span>
                        <div className="cursor-pointer" title="Adicionar comunidade" onClick={() => setOpenModalAddCommunity(true)}><AiOutlineUsergroupAdd size={iconSize}/></div>
                    </div>
                    <ScrollArea.Root 
                        className="h-[calc(100%-36px)] overflow-clip"
                        type="always"
                    >
                        <ScrollArea.Viewport className="w-[90%] max-w-full max-h-full rounded">
                            <div className="max-w-[198px]">
                                {userData?.communities ? (
                                    userData?.communities.map((community) => (
                                        <Button
                                            key={community.id}
                                            icon={<MdOutlinePeopleAlt size={iconSize} />}
                                            redirectTo={`/c/${community.name}`}
                                        >
                                            <p className="truncate max-w-[79%]">{community.name}</p>
                                        </Button>
                                    ))
                                ) : ""}
                            </div>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar
                            className="flex select-none touch-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                            orientation="vertical"
                        >
                            <ScrollArea.Thumb className="flex-1 bg-light-secondary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] dark:bg-dark-secondary" />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Corner className="bg-black" />
                    </ScrollArea.Root>
                </div>
            </div>
            {openModalProgress && <FormProgress onClose={() => setOpenModalProgress(false)}/>}
            {openModalAddBook && <FormAddBook onClose={() => setOpenModalAddBook(false)}/>}
            {openModalAddCommunity && <FormAddCommunity onClose={() => setOpenModalAddCommunity(false)}/>}
            {openModalUserConfig && <FormUserConfig onClose={() => setOpenModalUserConfig(false)}/>}
        </>
    );
}
