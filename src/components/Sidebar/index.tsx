import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Toggle } from "../Toggle";
import styles from "./Button.module.css";
import { ReactNode } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidBookAdd } from "react-icons/bi";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlinePeopleAlt } from "react-icons/md";

// type PropsTypes = {
//     variant?: "primary" | "secondary";
//     icon?: ReactNode;
//     onClick: React.MouseEventHandler;
//     children: ReactNode;
// };

// const variantMap: {primary: string; secondary: string} = {
//     primary: styles.primary,
//     secondary: styles.secondary
// };


export function Sidebar() {

    // const className: string[] = [styles.root, variantMap[variant]];
    const iconSize = 25;
    
    return (
        <div className="flex flex-col w-[260px] px-2 py-2 gap-2 text-light bg-primaryLight dark:text-dark dark:bg-primaryDark">
            <div>
                <div className="flex justify-between">
                    <Toggle/>
                    <span>Logout</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Avatar src="/images/image.jpg" size={200}/>
                    <p>Usuário</p>
                </div>
                <Button icon={<BiSolidBookAdd size={iconSize}/>} onClick={() => console.log("Teste")}>Novo Registro</Button>
            </div>
            <div className="py-2 border-solid border-y-2 border-light dark:border-dark">
                <Button icon={<TbLayoutDashboard size={iconSize}/>} onClick={() => console.log("Teste")}>DashBoard</Button>
                <Button icon={<AiOutlineSearch size={iconSize}/>} onClick={() => console.log("Teste")}>Pesquisar</Button>
                <Button icon={<BsFillPersonFill size={iconSize}/>} onClick={() => console.log("Teste")}>Meu perfil</Button>
            </div>
            <div>
                <div>Comunidades</div>
                <div>
                    <Button icon={<MdOutlinePeopleAlt size={iconSize}/>} onClick={() => console.log("Teste")}>Comunidade X</Button>
                    <Button icon={<MdOutlinePeopleAlt size={iconSize}/>} onClick={() => console.log("Teste")}>Comunidade X</Button>
                    <Button icon={<MdOutlinePeopleAlt size={iconSize}/>} onClick={() => console.log("Teste")}>Comunidade X</Button>
                </div>
            </div>
        </div>
    );
}
