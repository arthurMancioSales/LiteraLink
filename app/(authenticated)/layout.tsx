"use client";

import { Sidebar } from "@/src/components/Sidebar";
import { generalRequest } from "@/src/functions/generalRequest";
import { IUser } from "@/src/interfaces/interface";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const UserContext = createContext<IUserContext | null>(null);

export interface IUserContext {
    userData: IUser | null,
    loading: boolean,
    updateUser: () => void,
}

export default function DashboardLayout({
    children,
}: {
  children: React.ReactNode
}) {
    const navigate = useRouter();

    const [userData, setUserData] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUserData() {
            const response = await generalRequest("/api/user");

            if (response.error) {
                navigate.replace("/sign-in");
                return;                
            }

            if (response) {
                const user: IUser = response;
                setUserData(user);
            }
            setLoading(false);
        }

        getUserData();
    }, [navigate]);

    const updateUser = useCallback(async () => {
        setLoading(true);

        const response = await generalRequest("/api/user");

        if (response.error) {
            navigate.replace("/sign-in");
            return;                
        }

        if (response) {
            const user: IUser = response;
            setUserData(user);
        }

        setLoading(false);
    }, [navigate]);
    
    const contextValue = useMemo(() => ({
        userData,
        loading,
        updateUser
    }), [userData, loading, updateUser]);

    
    return (
        <UserContext.Provider value={contextValue}>
            <div className="flex min-h-screen bg-light-secondary dark:bg-dark-tertiary">
                <Sidebar/>
                {children}
            </div>
        </UserContext.Provider>        
    );
}
