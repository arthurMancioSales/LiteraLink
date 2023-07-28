"use client";

import { useState, useEffect } from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

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
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked={check} onChange={handleCheck}/>
            <div className="dark:hidden"> <BsFillMoonFill size={25}></BsFillMoonFill> </div>
            <div className="hidden dark:inline"> <FaSun size={25}></FaSun> </div>
        </label>
    );
}
