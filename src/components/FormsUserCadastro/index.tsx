import Link from "next/link";
import { Button, VariantButton } from "../Button";
import Image from "next/image";

type PropsTypes = {
    page: string;
    community: {
        id: number;
        name: string;
        image: string;
        auth: string;
        category: string;
        gender: string;
    }
    variantButton?: VariantButton;
};

export function FormsUserCadastro({page, community, variantButton}: PropsTypes) {
    function handleDashBoard() {
        console.log("clicou");                 
    }
    return (
        <div className="overflow-hidden rounded-lg relative w-[200px] h-[255px] bg-light-primary hover:bg-buttonHover dark:hover:bg-dark-primary dark:text-dark-text dark:bg-dark-secondary">
            <Link href={page} passHref>
                <div className="h-[95px] relative">
                    <Image
                        className="object-cover"
                        src={community.image}
                        alt=""
                        fill
                    />
                </div>
                <div className="px-2 pb-2">
                    <p className="text-2xl font-bold">{community.name}</p>
                    <p><span className="font-bold">Autor: </span>{community.auth}</p>
                    <p><span className="font-bold">Categoria: </span>{community.category}</p>
                    <p><span className="font-bold">Gênero </span>{community.gender}</p>
                </div>
            </Link>
            <div className="px-2">
                <Button onClick={handleDashBoard} variant={variantButton}>Inscrito</Button>
            </div>
        </div>
    );
}
