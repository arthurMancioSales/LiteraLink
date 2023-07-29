import { Avatar } from "../Avatar";

type PropsTypes = {
    imageUser: string;
    user: string;
};

export function CardUserCommunity({ imageUser, user }: PropsTypes) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-light-primary dark:bg-dark-secondary">
            <Avatar src={imageUser} size={70} />
            <p className="">{user}</p>
        </div>
    );
}
