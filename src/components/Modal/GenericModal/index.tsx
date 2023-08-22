"use client";

import { ReactNode } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface PropTypes {
    children: ReactNode;
    title: string;
    styleSize?: React.CSSProperties;
    onClose: () => void;
  }
  
export function GenericModal({ children, title, styleSize, onClose }: PropTypes) {
    
    function stopPropagation(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
    }

    return (
        <div className="w-full h-full bg-[#00000066] fixed top-0 left-0 flex justify-center items-center z-10 dark:text-dark-text" onClick={onClose}>
            <div style={styleSize} className="flex flex-col w-[40%] max-h-[99vh] rounded-lg drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] bg-light-primary dark:bg-dark-tertiary" onClick={stopPropagation}>
                <div className="flex justify-between px-4 py-4">
                    <div className="w-full text-lg font-bold text-center">
                        <span className="text-4xl">{title}</span>
                    </div>
                    <div className="cursor-pointer" onClick={onClose}>
                        <AiOutlineCloseCircle size={25} className="transition-all duration-150 hover:rotate-90"/>
                    </div>
                </div>
                <div className="flex flex-col h-full px-8 pb-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
