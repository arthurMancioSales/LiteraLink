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
            `w-full px-3.5 py-2 rounded-lg bg-primaryLight dark:bg-secondaryDark ${onClick ? "cursor-pointer" : ""}`
        }
        onClick={onClick}>
            {title && (
                <div className="mb-1 text-title font-medium dark:text-dark">{title}</div>
            )}
            <div className={className.join(" ")}>
                <p>{description}</p>
                <p>{`${progress}/${total}`}</p>
            </div>
            <div className="w-full h-4 mb-4 bg-tertiaryLight rounded-full dark:bg-dark">
                <div style={{width: `${progressPercent}`}} className="h-4 bg-secondaryLight rounded-full dark:bg-tertiaryDark"></div>
            </div>
        </div>
    );
}
