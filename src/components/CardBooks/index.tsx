import styles from "./CardBooks.module.css";

type PropsTypes = {
    variant?: "primary" | "secondary";
    id?: number | string;
    title?: string;
    description: string;
    progress: number;
    total: number;
    onClick?: (id: number | string) => void;
    complement?: string;
};

const variantMap: {primary: string; secondary: string} = {
    primary: styles.primary,
    secondary: styles.secondary
};

export function CardBooks({id, title, description, progress, total, variant="primary", onClick, complement}: PropsTypes) {
    const progressPercent = `${Math.round((progress/total)*100)}%`;
    const className: string[] = [styles.root, variantMap[variant]];

    function handleClick() {
        if (onClick && id) {            
            onClick(id);                                
        }
    }
 
    return (
        <div className={
            `w-full px-4 gap-2 py-2 flex flex-col rounded-md bg-light-primary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary ${onClick ? "cursor-pointer hover:bg-buttonHover" : ""}`
        }
        onClick={handleClick}>
            {title && (
                <div className="text-xl font-medium dark:text-dark-text">{title}</div>
            )}
            <div className={className.join(" ")}>
                <div className="flex justify-between">
                    <p>{description}</p>
                    
                </div>
                <p>{`${progress}/${total} ${complement ? complement : ""}`}</p>
            </div>
            <div className="w-full h-4 mb-4 rounded-full bg-light-tertiary dark:bg-dark-primary">
                <div style={{width: `${progressPercent}`}} className="h-4 rounded-full bg-light-secondary dark:bg-dark-tertiary"></div>
            </div>
        </div>
    );
}
