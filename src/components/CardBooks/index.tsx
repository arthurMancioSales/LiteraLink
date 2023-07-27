import styles from "./CardBooks.module.css";

type PropsTypes = {
    variant?: "primary" | "secondary";
    title?: string;
    description: string;
    progress: number;
    total: number;
    onClick?: React.MouseEventHandler
};

const variantMap: {primary: string; secondary: string} = {
    primary: styles.primary,
    secondary: styles.secondary
};


export function CardBooks({title, description, progress, total, variant="primary", onClick}: PropsTypes) {
    const progressPercent = `${Math.round((progress/total)*100)}%`;
    const className: string[] = [styles.root, variantMap[variant]];
 
    return (
        <div className={
            `w-full px-3.5 py-2 rounded-lg bg-light-primary dark:bg--dark-secondary ${onClick ? "cursor-pointer hover:bg-buttonHover" : ""}`
        }
        onClick={onClick}>
            {title && (
                <div className="mb-1 font-medium text-title dark:text-dark-text">{title}</div>
            )}
            <div className={className.join(" ")}>
                <p>{description}</p>
                <p>{`${progress}/${total}`}</p>
            </div>
            <div className="w-full h-4 mb-4 rounded-full bg-light-tertiary dark:bg-dark-text">
                <div style={{width: `${progressPercent}`}} className="h-4 rounded-full bg-light-secondary dark:bg-dark-tertiary"></div>
            </div>
        </div>
    );
}
