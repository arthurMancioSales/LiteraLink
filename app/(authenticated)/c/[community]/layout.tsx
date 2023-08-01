import { AsideCommunity } from "@/src/components/AsideCommunity";

interface ILayout {
    children: React.ReactNode;
    params: {
        community: string;
    }
}

export default function RootLayout({ children, params}: ILayout) {
    return (
        <div className="flex w-full h-screen gap-4 p-4 bg-light-secondary dark:bg-dark-tertiary">
            {children}
            <AsideCommunity communityURL={params.community}/>
        </div>
    );
}
