import { IChatContent } from "@/src/interfaces/interface";
import { Avatar } from "../Avatar";
import styles from "./ChatMessage.module.css";

export type VariantButton = "sender" | "reciever";

type VariantMap = {
    sender: string;
    reciever: string;
}

const variantMap: VariantMap = {
    sender: styles.sender,
    reciever: styles.reciever
};

interface IChatMessage {
    message: IChatContent
}

export default function ChatMessage({message}: IChatMessage) {
    
    const className: string[] = [styles.root, variantMap[message.variant]];
    
    return (
        <div className="flex flex-col w-full">
            <div className={className.join(" ")}>
                {message.variant == "reciever" ? (
                    <div>
                        <Avatar src={message.profilePicture} size={30}></Avatar>
                    </div>
                ) : ""}
                <div className="p-3 rounded-md bg-light-tertiary">
                    {message.variant == "reciever" ? (
                        <div className="">
                            <p className="font-semibold">{message.username}</p>
                        </div>
                    ) : ""}
                    <div>
                        <p>{message.message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
