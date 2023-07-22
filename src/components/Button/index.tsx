import styles from "./Button.module.css";
import { ReactNode } from "react";

type ButtonProps = {
    variant?: "primary" | "secondary";
    icon?: ReactNode;
    onClick: React.MouseEventHandler;
    children: ReactNode;
};

const variantMap: {primary: string; secondary: string} = {
    primary: styles.primary,
    secondary: styles.secondary
};


export function Button({children, icon, onClick, variant = "primary"}: ButtonProps) {

    const className: string[] = [styles.root, variantMap[variant]];
    
    return (
        <button onClick={onClick} type="button" className={className.join(" ")}>
            {icon}
            {children}
        </button>
    );
}
