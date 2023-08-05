import Image from "next/image";

type PropsTypes = {
    src: string;
    alt?: string;
};

export function ImagemLateral({ src, alt }: PropsTypes) {
    return (
        <div className="flex justify-end w-1/2 h-screen relative ">
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
