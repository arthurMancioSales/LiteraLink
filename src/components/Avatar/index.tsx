import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";

type PropsTypes = {
    src: string | undefined;
    alt?: string;
    size?: number;
};

export function Avatar({src, alt, size}: PropsTypes) { 
    return (
        <div
            className="overflow-hidden relative"
            style={{
                width: `${size}px`,
                height: `${size}px`               
            }}
        >
            {src ? 
                <Image
                    className="rounded-full object-cover"
                    src={src}
                    alt={alt ? alt : ""}
                    fill
                    priority
                /> 
                : 
                <FaRegUserCircle size={120}/>
            }
            
        </div>
    );
}
