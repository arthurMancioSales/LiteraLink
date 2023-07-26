import Image from "next/image";

type PropsTypes = {
    src: string;
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
            <Image
                className="rounded-full object-cover"
                src={src}
                alt={alt ? alt : ""}
                fill
                priority
            />
        </div>
    );
}
