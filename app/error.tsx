"use client";

import Image from "next/image";
import emptyBook from "public/images/emptyBook.svg";
import { useEffect } from "react";
import { SiBookstack } from "react-icons/si";
 
export default function Error({
    error,
}: {
  error: Error & { digest?: string }
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);
 
    return (
        <div className="flex items-center h-screen w-screen bg-light-primary dark:bg-dark-secondary">
            <div className="flex w-full justify-evenly">
                <div className="flex flex-col mt-[100px] gap-10">
                    <div className="flex items-center gap-3 dark:text-dark-text">
                        <SiBookstack size={60}/>
                        <span className="text-2xl font-bold">LiteraLink</span>                                    
                    </div>
                    <h2 className="text-4xl font-bold">Algo aconteceu de errado!</h2>
                </div>
                <div className="relative h-[70vh] w-[30%]">
                    <Image 
                        alt=""
                        src={emptyBook}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
