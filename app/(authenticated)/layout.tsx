"use client";

import { Sidebar } from "@/src/components/Sidebar";
import { generalRequest } from "@/src/functions/generalRequest";
import { IBook, IUser } from "@/src/interfaces/interface";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const UserContext = createContext<IUserContext | null>(null);

export interface IUserContext {
    userData: IUser | null,
    loading: boolean,
    updateUser: () => void,
}

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUserData() {
            const user: IUser = await generalRequest("/api/user");
            setUserData(user);
            setLoading(false);
        }

        getUserData();
    }, []);

    const updateUser = useCallback(async () => {
        setLoading(true);

        const user: IUser = await generalRequest("/api/user");
        
        setUserData(user);
        setLoading(false);
    }, []);
    
    const contextValue = useMemo(() => ({
        userData,
        loading,
        updateUser
    }), [userData, loading, updateUser]);

    
    return (
        <UserContext.Provider value={contextValue}>
            <div className="flex min-h-screen bg-light-secondary dark:bg-dark-tertiary">
                {<Sidebar/>}
                {children}
            </div>
        </UserContext.Provider>        
    );
}
