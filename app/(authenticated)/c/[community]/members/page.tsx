import { CardUserCommunity } from "@/src/components/CardUserCommunity";
import Link from "next/link";

const users = [
    {
        id: 1,
        image: "/images/image.jpg",
        name: "Tedasdadasdasdsadada"
    },
    {
        id: 2,
        image: "/images/image.jpg",
        name: "Tedasdadasdasdsadada"
    },
    {
        id: 3,
        image: "/images/image.jpg",
        name: "Tedasdadasdasdsadada"
    },
    {
        id:4,
        image: "/images/image.jpg",
        name: "Tedasdadasdasdsadada"
    },
    {
        id:5,
        image: "/images/image.jpg",
        name: "Tedasdadasdasdsadada"
    },
];

export default function CommunityMembers({ params }: { params: { community: string } }) {
    return (
        <div className="flex flex-col w-full h-full dark:text-dark-text">
            <div className="flex gap-2 items-center">
                <Link className="px-4" href={`/c/${params.community}`} passHref>
                    Chat
                </Link>
                <button className="bg-light-tertiary rounded-t-lg px-4 py-1 dark:bg-dark-primary">Membros</button>
            </div>
            <div className="flex flex-col gap-4 bg-light-tertiary h-full p-4 rounded-lg dark:bg-dark-primary">
                <div className="text-title">Usuários da comunidade</div>
                <div className="flex flex-col max-h-full gap-4 overflow-auto">
                    {users.map((user) => (
                        <CardUserCommunity key={user.id} imageUser={user.image} user={user.name}/>            
                    ))}
                </div>
            </div>
        </div>
    );
}
