"use client";

import { AiFillApple } from "react-icons/ai";
import { Button } from "@/src/components/Button";
import { CardBooks } from "@/src/components/CardBooks";
import { Avatar } from "@/src/components/Avatar";
import { Toggle } from "@/src/components/Toggle";

export default function Home() {
    return (
        <>
            <CardBooks title="Título" description="Capítulos" progress={7} total={14}/>
            <CardBooks description="Capítulos" progress={7} total={14} onClick={() => console.log("Clicou")} variant="secondary"/>
            <Button icon={<AiFillApple size={25}/>} onClick={() => console.log("Clicou")}>Teste</Button>
            <Avatar src="/images/image.jpg" size={200}/>
            <Toggle />
        </>
    );
}
