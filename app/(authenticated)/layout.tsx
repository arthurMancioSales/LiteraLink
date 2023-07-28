import { Sidebar } from "@/src/components/Sidebar";

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {

    return (
        <div className="flex min-h-screen bg-light-secondary dark:bg-dark-tertiary">
            {<Sidebar/>}
            {children}
        </div>
    );
}
