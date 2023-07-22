import styles from "./Button.module.css";
import { ReactNode } from "react";

type ButtonProps = {
    variant?: "primary" | "secondary";
    icon?: ReactNode;
    children: ReactNode;
};

const variantMap: {primary: string; secondary: string} = {
    primary: styles.primary,
    secondary: styles.secondary
};


export function Button({children, icon, variant = "primary"}: ButtonProps) {

    const className: string[] = [styles.root, variantMap[variant]];
    
    return (
        <button type="button" className={className.join(" ")}>
            {icon}
            {children}
        </button>
    );
}
