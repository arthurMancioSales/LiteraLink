import { Avatar } from "../Avatar";

type PropsTypes = {
    imageUser: string;
    user: string;
};

export function CardUserCommunity({ imageUser, user }: PropsTypes) {
    return (
        <div className="flex w-1/2 items-center space-x-3.5 px-3.5 py-3.5 rounded-lg bg-primaryLight dark:bg-secondaryDar">
            <Avatar src={imageUser} size={70} />
            <p className="">{user}</p>
        </div>
    );
}
