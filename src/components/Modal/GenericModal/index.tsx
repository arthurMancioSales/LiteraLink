"use client";

import { useState, useEffect, ReactNode } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface PropTypes {
    children: ReactNode;
    title: string;
    isOpen: boolean;
  }
  
export function GenericModal({ children, title, isOpen }: PropTypes) {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    },[isOpen]);
    
    function stopPropagation(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
    }

    if(!open) {
        return <></>;
    }

    function onClose() {
        setOpen(false);
    }

  
    return (
        <div className="w-full h-full bg-[#00000066] fixed top-0 left-0 flex justify-center items-center" onClick={onClose}>
            <div className="flex flex-col w-1/3 rounded-lg drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] bg-light-primary dark:bg-dark-tertiary" onClick={stopPropagation}>
                <div className="flex justify-between px-4 py-4">
                    <div className="w-full text-center text-lg font-bold">
                        <span>{title}</span>
                    </div>
                    <div className="cursor-pointer" onClick={onClose}>
                        <AiOutlineCloseCircle size={25}/>
                    </div>
                </div>
                <div className="flex flex-col px-16 pb-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
