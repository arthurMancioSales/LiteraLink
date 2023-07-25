"use client";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Toggle } from "../Toggle";
import styles from "./Button.module.css";
import { ReactNode } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidBookAdd, BiLogOut } from "react-icons/bi";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlinePeopleAlt } from "react-icons/md";
import Link from "next/link";

type community = {id: number, name: string}

type PropsTypes = {
    user: string;
    imageUser: string;
    communities?: Array<community>;
};

export function Sidebar({user, imageUser, communities}: PropsTypes) {
    const iconSize = 25;

    return (
        <div className="flex flex-col w-[260px] px-2 py-2 gap-2 text-light bg-primaryLight dark:text-dark dark:bg-primaryDark">
            <div>
                <div className="flex justify-between">
                    <Toggle/>
                    <Link href="/" className="text-red-600" title="Logout" passHref><BiLogOut size={iconSize}/></Link>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Avatar src={imageUser} size={200}/>
                    <p>{user}</p>
                </div>
                <Button icon={<BiSolidBookAdd size={iconSize}/>} redirectTo="/profile">Novo Registro</Button>
            </div>
            <div className="py-2 border-solid border-y-2 border-light dark:border-dark">
                <Button icon={<TbLayoutDashboard size={iconSize}/>} redirectTo="/dashboard">DashBoard</Button>
                <Button icon={<AiOutlineSearch size={iconSize}/>} redirectTo="/search/default">Pesquisar</Button>
                <Button icon={<BsFillPersonFill size={iconSize}/>} redirectTo="/profile">Meu perfil</Button>
            </div>
            <div>
                <div>Comunidades</div>
                <div>
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
                </div>
            </div>
        </div>
    );
}
