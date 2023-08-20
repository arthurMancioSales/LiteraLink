import { FaRegUserCircle } from "react-icons/fa";

type PropsTypes = {
    src?: string;
    alt?: string;
    size?: number;
};

export function Avatar({src, alt, size}: PropsTypes) { 
    return (
        <div
            className="relative overflow-hidden"
            style={{
                width: `${size}px`,
                height: `${size}px`               
            }}
        >
            {src ? 
                <img src={src} alt={alt ? alt : ""} className="object-cover w-full h-full rounded-full" />
                : 
                <FaRegUserCircle size={size}/>
            }
            
        </div>
    );
}
