"use client";

import { AiFillApple } from "react-icons/ai";
import { Button } from "@/src/components/Button";

export default function Home() {
    return (
        <Button icon={<AiFillApple size={25}/>} onClick={() => console.log("Clicou")}>Teste</Button>
    );
}
