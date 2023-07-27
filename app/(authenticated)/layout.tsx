import { Sidebar } from "@/src/components/Sidebar";

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    const communities = [
        {
            id: 1,
            name: "Teste"
        },
        {
            id: 2,
            name: "Teste2"
        },
        {
            id: 3,
            name: "Teste2"
        },
        {
            id: 4,
            name: "Teste2"
        }
    ];

    return (
        <div className="flex min-h-screen">
            {<Sidebar user="Usuário" imageUser="/images/image.jpg" communities={communities}/>}
            {children}
        </div>
    );
}
