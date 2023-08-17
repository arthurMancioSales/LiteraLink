import { IGoalsType } from "@/src/interfaces/interface";
import styles from "./CardBooks.module.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";

type PropsTypes = {
    variant?: "primary" | "secondary";
    id?: number | string | IGoalsType;
    title?: string;
    description: string;
    progress: number;
    total: number;
    onClick?: (id: number | string) => void;
    complement?: string;
    onEdit?: (typeGoal: IGoalsType) => void;
    onDelete?: (typeGoal: IGoalsType) => void;
    fixed?: boolean
};

const variantMap: {primary: string; secondary: string} = {
    primary: styles.primary,
    secondary: styles.secondary
};

export function CardBooks({id, title, description, progress, total, variant="primary", onClick, complement, onEdit, onDelete, fixed}: PropsTypes) {
    const progressPercent = `${Math.round((progress/total)*100)}%`;
    const className: string[] = [styles.root, variantMap[variant]];

    function handleClick() {
        if (onClick && id) {            
            onClick(id);                                
        }
    }

    function handleEdit() {
        if (onEdit && id && (id === "time")) {
            onEdit(id);                                
        }
    }

    function handleDelete() {
        if (onDelete && id && (id === "time" || id === "days")) {
            onDelete(id);                                
        }
    }
 
    return (
        <div 
            className="w-full px-4 gap-2 py-2 flex flex-col rounded-md bg-light-primary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary"
        >
            <div className="flex justify-between">
                {title && (
                    <div className="text-xl font-medium dark:text-dark-text w-[calc(100%-38px)]">{title}</div>
                )}
                {fixed === true && <BsPinAngleFill 
                    size={30}
                    className="p-1 rounded-full"
                ></BsPinAngleFill>}
                {fixed === false && <BsPinAngle 
                    size={30}
                    className="p-1 rounded-full cursor-pointer hover:bg-buttonHover"
                    onClick={handleClick}
                ></BsPinAngle>}
            </div>
            <div className={className.join(" ")}>
                <div className="flex items-center gap-2">
                    <p>{description}</p>
                    {id === "time" && onEdit && (
                        <FaRegEdit className="cursor-pointer text-light-text dark:text-dark-text" size={20} onClick={handleEdit}/>
                    )}
                    {(id === "time" || id === "days") && onDelete && (
                        <RiDeleteBin6Line className="cursor-pointer text-status-error" size={20} onClick={handleDelete}/>
                    )}
                </div>
                <p>{`${progress}/${total} ${complement ? complement : ""}`}</p>
            </div>
            <div className="w-full h-4 mb-4 rounded-full bg-light-tertiary dark:bg-dark-primary">
                <div style={{width: `${progressPercent}`}} className="h-4 rounded-full bg-light-secondary dark:bg-dark-tertiary"></div>
            </div>
        </div>
    );
}
