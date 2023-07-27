import Link from "next/link";
import { ReactNode } from "react";

type PropTypes = {
    variant?: "primary" | "secondary";
    icon: ReactNode;
    redirectTo?: string;
    onClick?: React.MouseEventHandler;
    value: number;
    children: ReactNode;
};

export function UserGoals({children, value, icon, onClick, redirectTo}: PropTypes) {

    const className = "flex flex-col justify-center items-center";

    const navigate = redirectTo ? redirectTo : "#";
    
    return (
        <>
            {redirectTo ?
                <Link href={navigate} passHref>
                    <div className={className}>
                        {icon}
                        <p>{children}</p>
                        <p>{value}</p>
                    </div>
                </Link>
                :
                <div onClick={onClick} className={className}>
                    {icon}
                    <p>{children}</p>
                    <p>{value}</p>
                </div>
            }
        </>
    );
}
