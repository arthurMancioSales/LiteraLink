"use client";

// import { Progress } from "@chakra-ui/react";
import { AiFillApple } from "react-icons/ai";

export default function Home() {
    return (
        <>
            Home
            
            {/* <Progress value={50}/> */}
            <button className="bg-gray-800 hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                <AiFillApple/>
                <span>Download</span>
            </button>
        </>
        // <>Home</>
    );
}
