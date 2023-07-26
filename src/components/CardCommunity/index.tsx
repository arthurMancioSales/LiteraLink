import { BgCardCommunity } from "../BgCardCommunity";
import { Button } from "../Button";

type PropsTypes = {
    imageUser: string;
    idcommunity: string;
    generocommunity: string;

};

export function CardCommunity({imageUser, idcommunity, generocommunity}: PropsTypes) { 
    function handleDashBoard() {
        console.log("clicou");                 
    }
    return (
        <div className="flex flex-col w-1/5 space-y-4 m-3 items-start rounded-lg bg-primaryLight dark:bg-secondaryDar">
            <BgCardCommunity src={imageUser} size={180}/>

            <p className="pl-4">{idcommunity}</p>

            <div className="flex pl-4 space-x-3 text-xs">
                <p>{"#"+generocommunity}</p>
                <p>{"#"+generocommunity}</p>
            </div>

            <div className="flex pl-2.5 bg-#8B5CF6">
                <Button onClick={handleDashBoard}>Voltar</Button>
            </div>
        </div>
    );
}
