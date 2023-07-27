"use client";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Toggle } from "../Toggle";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidBookAdd, BiLogOut } from "react-icons/bi";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlinePeopleAlt } from "react-icons/md";
import Link from "next/link";
import * as ScrollArea from "@radix-ui/react-scroll-area";

type community = {id: number, name: string}

type PropsTypes = {
    user: string;
    imageUser: string;
    communities?: Array<community>;
};

export function Sidebar({user, imageUser, communities}: PropsTypes) {
    const iconSize = 25;

    return (
        <div className="flex flex-col w-[260px] p-4 gap-2 text-light-text bg-light-primary dark:text-dark-text dark:bg-dark-primary rounded-r-md max-h-screen">
            <div>
                <div className="flex justify-between">
                    <Toggle/>
                    <Link href="/" className="text-red-600" title="Logout" passHref><BiLogOut size={iconSize}/></Link>
                </div>
                <div className="flex flex-col items-center justify-center pt-3">
                    <Avatar src={imageUser} size={150}/>
                    <p className="pt-3">{user}</p>
                </div>
                <Button icon={<BiSolidBookAdd size={iconSize}/>} redirectTo="/profile">Novo Registro</Button>
            </div>
            <div className="py-2 border-solid border-y-2 border-light-text dark:border-dark-text">
                <Button icon={<TbLayoutDashboard size={iconSize}/>} redirectTo="/dashboard">DashBoard</Button>
                <Button icon={<AiOutlineSearch size={iconSize}/>} redirectTo="/search/default">Pesquisar</Button>
                <Button icon={<BsFillPersonFill size={iconSize}/>} redirectTo="/profile">Meu perfil</Button>
            </div>
            <div className="h-1/4">
                <div>Comunidades</div>
                <ScrollArea.Root className="h-full overflow-hidden">
                    <ScrollArea.Viewport className="w-[90%] max-h-full rounded">
                        {communities ?
                            communities.map((community) => (
                                <Button
                                    key={community.id}
                                    icon={<MdOutlinePeopleAlt size={iconSize} />}
                                    redirectTo={`/c/${community.id}`}
                                    
                                >
                                    {community.name}
                                </Button>
                            )) : <></>
                        }
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                        className="flex select-none touch-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                        orientation="vertical"
                        forceMount
                    >
                        <ScrollArea.Thumb className="flex-1 bg-light-secondary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] dark:bg-dark-secondary" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner className="bg-black" />
                </ScrollArea.Root>
            </div>
        </div>
    );
}
