import { Avatar } from "../Avatar";

type PropsTypes = {
    imageUser: string;
    user: string;
};

export function CardUserCommunity({ imageUser, user }: PropsTypes) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-light-primary dark:bg-dark-secondary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
            <Avatar src={imageUser} size={70} />
            <p className="dark:text-dark-text">{user}</p>
        </div>
    );
}
