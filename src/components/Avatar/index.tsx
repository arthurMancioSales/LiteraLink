import Image, { StaticImageData } from "next/image";
import { FaRegUserCircle } from "react-icons/fa";

type PropsTypes = {
    src?: string | StaticImageData | undefined;
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
                <Image
                    className="object-cover rounded-full"
                    src={src}
                    alt={alt ? alt : ""}
                    fill
                    priority
                /> 
                : 
                <FaRegUserCircle size={size}/>
            }
            
        </div>
    );
}
