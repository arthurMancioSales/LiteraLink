"use client";

import { GenericModal } from "../../Modal/GenericModal";
import { Button } from "../../Button";
import { SearchBook } from "./SearchBook";
import { useContext, useState } from "react";
import { IBookApi } from "@/app/api/book-list/[apiExternal]/route";
import { generalRequest } from "@/src/functions/generalRequest";
import { UserContext } from "@/app/(authenticated)/layout";

interface PropTypes {
    onClose: () => void;
}

export function FormAddBook({ onClose }: PropTypes) {
    const userContext = useContext(UserContext);
    const updateUser = userContext?.updateUser;

    const [book, setBook] = useState<IBookApi | undefined>();
    const [messageError, setMessageError] = useState("");

    function handleBook(value: IBookApi) {
        setBook(value);
    }

    async function saveBook() {
        if(!book) return;

        const requestBody = {
            id: book.id,
            title: book.title,
            image: book.image,
            totalPages: book.pages
        };
        
        const response = await generalRequest("/api/book-list", requestBody, "POST");

        if(response?.error) {
            setMessageError(response.error);
        } else {
            if(updateUser) {
                updateUser();
            }

            onClose();
        }        
    }
    
    return (
        <GenericModal
            title="Adicionar um livro"
            styleSize={{height: "347px"}}
            onClose={onClose}
        >
            <SearchBook value={handleBook} />
            {book && (
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label>Livro</label>
                        <div className="bg-light-tertiary opacity-70 p-1 rounded-md drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark-text">
                            <p>{book ? book.title : "Nenhum livro adicionado"}</p>
                        </div>
                        <label>Quantidade páginas</label>
                        <div className="bg-light-tertiary opacity-70 p-1 min-h-[32px] rounded-md drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark-text">
                            <p>{book ? book.pages : "Nenhum livro adicionado"}</p>
                        </div>
                    </div>
                    <Button type="submit" variant="info" onClick={saveBook}>ADICIONAR</Button>
                </div>
            )}
            <p className="text-status-error">{messageError}</p>
        </GenericModal>
    );
}
