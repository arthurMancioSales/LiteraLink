import Link from "next/link";
import styles from "./Button.module.css";
import { ReactNode } from "react";

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
                <svg className="w-5 h-5 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {children}
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
