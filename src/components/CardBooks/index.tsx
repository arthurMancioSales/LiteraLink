import styles from "./CardBooks.module.css";

type PropsTypes = {
    variant?: "primary" | "secondary";
    title?: string;
    description: string;
    progress: number;
    total: number;
    onClick?: React.MouseEventHandler;
    complement?: string;
};

const variantMap: {primary: string; secondary: string} = {
    primary: styles.primary,
    secondary: styles.secondary
};

export function CardBooks({title, description, progress, total, variant="primary", onClick, complement}: PropsTypes) {
    const progressPercent = `${Math.round((progress/total)*100)}%`;
    const className: string[] = [styles.root, variantMap[variant]];
 
    return (
        <div className={
            `w-full px-4 gap-2 py-2 flex flex-col rounded-md bg-light-primary dark:bg-dark-secondary ${onClick ? "cursor-pointer hover:bg-buttonHover" : ""}`
        }
        onClick={onClick}>
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
