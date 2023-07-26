"use client";

import { CardBooks } from "@/src/components/CardBooks";
import { CardCommunity } from "@/src/components/CardCommunity";
import { CardUserCommunity } from "@/src/components/CardUserCommunity";
import { Sidebar } from "@/src/components/Sidebar";

export default function Home() {
    return (
        <>
            <CardBooks title="Título" description="Capítulos" progress={7} total={14}/>
            <CardBooks description="Capítulos" progress={7} total={14} onClick={() => console.log("Clicou")} variant="secondary"/>
            <Sidebar user="Usuário" imageUser="/images/image.jpg"/>
            <CardCommunity imageUser="/images/image.jpg" idcommunity="COMUNIDADE 1" generocommunity="TESTE"/>
        </>
    );
}
