import Image from "next/image";


type PropsTypes = {
    src: string;
    alt?: string;
    size?: number;
};

export function BgCardCommunity({src, alt, size}: PropsTypes) { 
    return (
        <div
            className="overflow-hidden relative"
            style={{
                width: "100%",
                height: `${size}px`               
            }}
        >
            <Image
                className="object-cover rounded-t-lg"
                src={src}
                alt={alt ? alt : ""}
                fill
            />
        </div>
    );
}
