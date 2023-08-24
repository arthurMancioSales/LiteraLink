"use client";

import { useState } from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

export function Toggle() {
    let value;
    if (typeof window !== "undefined") {
        value = window.localStorage.getItem("mode");
    }
    const [check, setCheck] = useState(value == "dark" ? false : true);

    function handleCheck() {
        setCheck(!check);

        const html = document.querySelector("html");
        if(html) {
            html.dataset["mode"] = check ? "dark" : "false";
        }
        
        window.localStorage.setItem("mode", check ? "dark" : "false");
    }

    return (
        <div className="relative inline-flex items-center cursor-pointer dark:text-dark-text">
            <div className="dark:hidden" onClick={handleCheck}> <BsFillMoonFill size={25} title="Alterar tema"></BsFillMoonFill> </div>
            <div className="hidden dark:inline" onClick={handleCheck}> <FaSun size={25} title="Alterar tema"></FaSun> </div>
        </div>
    );
}
