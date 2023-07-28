import { Avatar } from "../Avatar";

type PropTypes = {
    name: string;
    bookFavorite: string;
    description: string;
    status: string;
};

export function AsideCommunity({name, bookFavorite, description, status}: PropTypes) {
    return (
        <>
            <aside className="flex flex-col gap-4 p-4 items-center rounded-lg bg-light-tertiary w-[350px]">
                <div className="flex justify-between w-full items-center">
                    <p className="text-title">Comunidade</p>
                    <p>{status}</p>
                </div>
                <div className="text-center">
                    <Avatar src="/images/image.jpg" size={125}/>
                    <p>{name}</p>
                </div>
                <div className="bg-light-primary rounded-lg w-full p-2">
                    <p className="text-title font-bold">Livro favorito</p>
                    <p>{bookFavorite}</p>
                </div>
                <div className="bg-light-primary rounded-lg w-full h-full p-2">
                    <p className="text-title font-bold">Descrição</p>
                    <p>{description}</p>
                </div>
            </aside>
        </>
    );
}
