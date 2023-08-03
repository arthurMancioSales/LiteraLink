import Link from "next/link";
import { ReactNode } from "react";
import { TextLoading } from "../Loaders/TextLoading";

type PropTypes = {
    variant?: "primary" | "secondary";
    icon: ReactNode;
    redirectTo?: string;
    onClick?: React.MouseEventHandler;
    value: number;
    children: ReactNode;
    complement?: string;
    loading?: boolean;
};

export function UserGoals({ children, value, icon, onClick, redirectTo, complement, loading = true }: PropTypes) {

    const className = "flex flex-col items-center justify-center px-2";

    const navigate = redirectTo ? redirectTo : "#";

    return (
        <>
            {redirectTo ?
                <Link href={navigate} passHref>
                    <div className={className}>
                        {icon}
                        <p>{children}</p>
                        {loading ? <TextLoading size="large" /> : <p className="text-3xl dark:text-dark-text">{value} <span className="text-base">{complement}</span></p>}
                    </div>
                </Link>
                :
                <div onClick={onClick} className={className}>
                    <span className="pb-1 dark:text-dark-text">{icon}</span>
                    <p className="py-1 text-base dark:text-dark-text">{children}</p>
                    {loading ? <TextLoading size="large" /> : <p className="text-3xl dark:text-dark-text">{value} <span className="text-base">{complement}</span></p>}
                </div>
            }
        </>
    );
}
