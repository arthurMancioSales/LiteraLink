import { verifyToken } from "@/src/utils/middlewares/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function PublicLayout({
    children,
}: {
  children: React.ReactNode
}) {
    const cookie = cookies().get("Session");

    if (cookie) {
        const token = verifyToken(cookie.value);

        if (token) {
            redirect("/dashboard");
        }
    }
    
    return (
        <>
            {children}
        </>
    );
}
