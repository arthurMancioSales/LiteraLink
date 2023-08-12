import Link from "next/link";
import styles from "./Button.module.css";
import { ReactNode } from "react";
import { TextLoading } from "../Loaders/TextLoading";

export type VariantButton = "primary" | "secondary" | "info" | "success" | "error" | "loading";

type VariantMap = {
    primary: string;
    secondary: string;
    info: string;
    success: string;
    error: string;
    loading: string;
}

type PropTypes = {
    variant?: VariantButton;
    icon?: ReactNode;
    redirectTo?: string;
    onClick?: () => void;
    children: ReactNode;
    type?: "button" | "submit";
    isLoading?: boolean;
};

const variantMap: VariantMap = {
    primary: styles.primary,
    secondary: styles.secondary,
    info: styles.info,
    success: styles.success,
    error: styles.error,
    loading: styles.loading,
};


export function Button({children, icon, onClick, variant = "primary", redirectTo, type = "button", isLoading}: PropTypes) {

    const className: string[] = [styles.root, variantMap[variant]];

    if(isLoading) {
        return (
            <button type={type} className={[styles.root, variantMap["loading"]].join(" ")}>
                <TextLoading size="base"/>
            </button>
        );
    }
    
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
