"use client";

import { AiFillApple } from "react-icons/ai";
import { Button } from "@/src/components/Button";
import { CardBooks } from "@/src/components/CardBooks";

export default function Home() {
    return (
        <>
            <CardBooks title="Título" description="Capítulos" progress={7} total={14}/>
            <CardBooks description="Capítulos" progress={7} total={14} variant="secondary"/>
            <Button icon={<AiFillApple size={25}/>} onClick={() => console.log("Clicou")}>Teste</Button>
        </>
    );
}
