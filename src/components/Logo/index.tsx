import Link from "next/link";
import { SiBookstack } from "react-icons/si";

export function Logo() {
    
    return (
        <Link className="flex gap-3 items-center" href="/" passHref>
            <SiBookstack size={30}/>
            <span className="text-lg font-bold">LiteraLink</span>                                    
        </Link>
    );
}
