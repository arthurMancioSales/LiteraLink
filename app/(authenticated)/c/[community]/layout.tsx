import { AsideCommunity } from "@/src/components/AsideCommunity";

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <div className="flex h-screen w-full p-4 gap-4 bg-light-secondary dark:bg-dark-tertiary">
            {children}
            <AsideCommunity name="Teste" bookFavorite="Teste2" status="Sair" description="Teste3"/>
        </div>
    );
}
