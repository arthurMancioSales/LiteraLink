import Image from "next/image";

type PropsTypes = {
    src: string;
    alt?: string;
};

export function SideImageSign({ src, alt }: PropsTypes) {
    return (
        <div className="relative w-1/2 h-screen">
            <Image
                className=" object-cover "
                src={src}
                alt={alt ? alt : ""}
                fill
                priority
            />
        </div>
    );
}
