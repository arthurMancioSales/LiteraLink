"use client";

import { useState, useEffect } from "react";

export function Toggle() {
    const [check, setCheck] = useState(false);

    const darkMode = check ? "dark" : "false";

    function handleCheck() {
        setCheck(!check);
    }
    
    useEffect(() => {
        const html = document.querySelector("html");
        if(html) {
            html.dataset["mode"] = darkMode;
        }
    }, [darkMode]);

    return (
        <label className="relative inline-flex items-center mr-5 cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked={check} onChange={handleCheck}/>
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Modo escuro</span>
        </label>
    );
}
