export default function CommunityChat() {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex gap-2">
                <button className="bg-light-tertiary rounded-t-lg px-4 py-1">Chat</button>
                <button>Membros</button>
            </div>
            <div className="bg-light-tertiary h-full p-4 rounded-lg rounded-tl-none">Comunidade</div>
        </div>
    );
}
