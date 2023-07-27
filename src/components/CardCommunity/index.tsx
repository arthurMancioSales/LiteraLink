// import { BgCardCommunity } from "./BgCardCommunity";
import { Button } from "../Button";
import Image from "next/image";

type PropsTypes = {
    community: {
        id: number;
        name: string;
        image: string;
        auth: string;
        category: string;
        gender: string;
    }
};

export function CardCommunity({community}: PropsTypes) {
    function handleDashBoard() {
        console.log("clicou");                 
    }
    return (
        <div className="overflow-hidden rounded-lg relative w-[200px] h-[250px] bg-light-primary">
            <div className="h-[95px] relative">
                <Image
                    className="object-cover"
                    src={community.image}
                    alt=""
                    fill
                />
            </div>
            <div className="flex flex-col justify-between content-between px-2 pb-2">
                <div>
                    <p className="text-2xl font-bold">{community.name}</p>
                    <p><span className="font-bold">Autor: </span>{community.auth}</p>
                    <p><span className="font-bold">Categoria: </span>{community.category}</p>
                    <p><span className="font-bold">Gênero </span>{community.gender}</p>
                </div>
                <Button onClick={handleDashBoard}>Voltar</Button>
            </div>
        </div>
    );
}
