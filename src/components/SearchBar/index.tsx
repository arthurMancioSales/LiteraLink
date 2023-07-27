import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "../Button";

type PropTypes = {
    variant?: "primary" | "secondary";
    value: string;
    onSearch: (value: string) => void;
};

export const SearchForm = ({value, onSearch}: PropTypes) => {
    const handleSearch = () => {
        onSearch(value);
    };
      
    return (
        <form className="w-full">
            <div className="flex justify-between p-1 gap-2 rounded-lg bg-light-primary">
                <select id="searchBar" className="bg-transparent">
                    <option value="1">Comunidades</option>
                    <option value="2">Autor</option>
                    <option value="3">Categoria</option>
                    <option value="4">Gênero</option>
                </select>
                <input
                    type="search"
                    className="bg-transparent w-full px-2"
                    value={value}
                    placeholder="Pesquisar"
                    onChange={(e) => onSearch(e.target.value)}
                />
                <div>
                    <Button icon={<AiOutlineSearch size={25}/>} onClick={handleSearch}>Pesquisar</Button>
                </div>
            </div>
        </form>
    );
};
