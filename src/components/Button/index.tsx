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
    onClick?: React.MouseEventHandler;
    children: ReactNode;
};

const variantMap: VariantMap = {
    primary: styles.primary,
    secondary: styles.secondary,
    info: styles.info,
    success: styles.success,
};


export function Button({children, icon, onClick, variant = "primary", redirectTo}: PropTypes) {

    const className: string[] = [styles.root, variantMap[variant]];

    const navigate = redirectTo ? redirectTo : "#";
    
    return (
        <>
            {redirectTo ?
                <Link href={navigate} passHref>
                    <button type="button" className={className.join(" ")}>
                        {icon}
                        {children}
                    </button>
                </Link>
                :
                <button onClick={onClick} type="button" className={className.join(" ")}>
                    {icon}
                    {children}
                </button>
            }
        </>
    );
}
