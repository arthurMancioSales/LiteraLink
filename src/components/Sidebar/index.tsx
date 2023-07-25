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

type PropsTypes = {
    user: string;
    imageUser: string;
    communities?: string[];
};

export function Sidebar({user, imageUser, communities}: PropsTypes) {
    const iconSize = 25;

    function handleNewRegister() {
        console.log("clicou");            
    }

    function handleDashBoard() {
        console.log("clicou");                 
    }

    function handleSearch() {
        console.log("clicou");         
    }

    function handleProfile() {
        console.log("clicou");         
    }
    
    return (
        <div className="flex flex-col w-[260px] px-2 py-2 gap-2 text-light bg-primaryLight dark:text-dark dark:bg-primaryDark">
            <div>
                <div className="flex justify-between">
                    <Toggle/>
                    <Link href="/" className="text-red-600" title="Logout"><BiLogOut size={iconSize}/></Link>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Avatar src={imageUser} size={200}/>
                    <p>{user}</p>
                </div>
                <Button icon={<BiSolidBookAdd size={iconSize}/>} onClick={handleNewRegister}>Novo Registro</Button>
            </div>
            <div className="py-2 border-solid border-y-2 border-light dark:border-dark">
                <Button icon={<TbLayoutDashboard size={iconSize}/>} onClick={handleDashBoard}>DashBoard</Button>
                <Button icon={<AiOutlineSearch size={iconSize}/>} onClick={handleSearch}>Pesquisar</Button>
                <Button icon={<BsFillPersonFill size={iconSize}/>} onClick={handleProfile}>Meu perfil</Button>
            </div>
            <div>
                <div>Comunidades</div>
                <div>
                    {communities && (
                        communities.map((community, index) => (
                            <Button key={index} icon={<MdOutlinePeopleAlt size={iconSize}/>} onClick={() => console.log(index)}>{community}</Button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
