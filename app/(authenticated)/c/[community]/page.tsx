import Link from "next/link";

export default function CommunityChat({ params }: { params: { community: string } }) {
    return (
        <div className="flex flex-col w-full h-full dark:text-dark-text">
            <div className="flex gap-2 items-center">
                <button className="bg-light-tertiary rounded-t-lg px-4 py-1 dark:bg-dark-primary">Chat</button>
                <Link className="px-4" href={`/c/${params.community}/members`} passHref>
                    Membros
                </Link>
            </div>
            <div className="bg-light-tertiary h-full p-4 rounded-lg rounded-tl-none dark:bg-dark-primary">Comunidade</div>
        </div>
    );
}
