import Link from "next/link";
import { Button } from "../Button";
import { ICommunity } from "@/src/interfaces/interface";
import { BiSolidGroup } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";

type PropsTypes = {
    page: string;
    community:ICommunity;
    isMember: boolean;
    isAdmin: boolean;
    handleCommunity: (nameCommunity: string, isMember: boolean) => void;
    handleConfigModal: Dispatch<SetStateAction<boolean>>;
    handleConfigCommunity: Dispatch<SetStateAction<ICommunity | null>>;
};

export function CardCommunity({page, community, isMember, isAdmin, handleCommunity, handleConfigModal, handleConfigCommunity }: PropsTypes) {
    function renderCardButtons() {
        if (isAdmin) {
            return (
                <div className="w-1/2">
                    <Button onClick={() => {
                        setCommunityToConfig();
                    }} variant="tertiary">Editar</Button> 
                </div>
            );
        }

        if (isMember) {
            return (
                <div className="w-1/2">
                    <Button onClick={() => handleCommunity(community.name, isMember)} variant={"error"}>Sair</Button> 
                </div>
            );
        }

        return (
            <div className="w-1/2">
                <Button onClick={() => handleCommunity(community.name, isMember)} variant={"success"}>Entrar</Button>
            </div>
        );
    }

    function setCommunityToConfig() {
        handleConfigModal(true);
        handleConfigCommunity(community);
    }
    
    return (
        <div className="overflow-hidden rounded-lg relative w-full h-[255px] bg-light-primary hover:bg-buttonHover dark:hover:bg-dark-tertiary dark:text-dark-text dark:bg-dark-secondary transition-all duration-300 hover:scale-105 flex flex-col">
            <Link href={page} passHref>
                <div className="h-[95px] relative">
                    <img
                        className="object-cover w-full h-full"
                        src={community.image ? community.image : "/images/user/default_community_image.jpg"}
                        alt=""
                    />
                </div>
                <div className="px-2 pb-2">
                    <p className="pt-2 text-lg font-bold">{community.name}</p>
                    <div className="flex items-center gap-3">
                        <BiSolidGroup></BiSolidGroup><p><span className="font-bold"></span> {community.members.length}</p>
                    </div>
                </div>
            </Link>
            <div className="px-2 pb-2 mt-auto">
                {renderCardButtons()}
            </div>
        </div>
    );
}
