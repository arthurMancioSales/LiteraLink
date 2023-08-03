import Link from "next/link";
import styles from "./Button.module.css";
import { ReactNode } from "react";

export type VariantButton = "primary" | "secondary" | "info" | "success";

type VariantMap = {
    primary: string;
    secondary: string;
    info: string;
    success: string;
}

type PropTypes = {
    variant?: VariantButton;
    icon?: ReactNode;
    redirectTo?: string;
    onClick?: () => void;
    children: ReactNode;
    type?: "button" | "submit";
};

const variantMap: VariantMap = {
    primary: styles.primary,
    secondary: styles.secondary,
    info: styles.info,
    success: styles.success,
};


export function Button({children, icon, onClick, variant = "primary", redirectTo, type = "button"}: PropTypes) {

    const className: string[] = [styles.root, variantMap[variant]];
    
    return (
        <>
            {redirectTo ?
                <Link href={redirectTo} passHref>
                    <button type={type} className={className.join(" ")}>
                        {icon}
                        {children}
                    </button>
                </Link>
                :
                <button onClick={onClick} type={type} className={className.join(" ")}>
                    {icon}
                    {children}
                </button>
            }
        </>
    );
}
