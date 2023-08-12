"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Input } from "../../Input";
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
    
    const validationSchema = Yup.object({
        TotalSequence: Yup.number().max(100, "Ops! Este número é muito grande").min(0, "Não existe sequências negativas"),
        TotalReadingTime: Yup.number().max(1440, "Ops! Tempo de leitura muito longo").min(0, "Não existe tempo negativo")
    });

    const initialValues = {
        TotalSequence: 0,
        TotalReadingTime: 0
    };
  
    return (
        <GenericModal
            title="Adicionar um livro"
            styleSize={{height: "90vh"}}
            onClose={onClose}
        >
            <SearchBook value={handleBook} />
            {book && (

                <div className="flex flex-col gap-2">
                    <label>Livro</label>
                    <div className="bg-light-tertiary opacity-70 p-1 rounded-md drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
                        <p>{book ? book.title : "Nenhum livro adicionado"}</p>
                    </div>
                    <label>Quantidade páginas</label>
                    <div className="bg-light-tertiary opacity-70 p-1 rounded-md drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
                        <p>{book ? book.pages : "Nenhum livro adicionado"}</p>
                    </div>
                    <Formik 
                        onSubmit={async (values, {setSubmitting}) => {
                            const formBody = {
                                id: book.id,
                                title: book.title,
                                image: book.image,
                                totalPages: book.pages,
                                TotalSequence: values.TotalSequence,
                                TotalReadingTime: values.TotalReadingTime
                            };
                            
                            const response = await generalRequest("/api/book-list", formBody, "POST");

                            if(response?.error) {
                                setMessageError(response.error);
                            } else {
                                if(updateUser) {
                                    updateUser();
                                }

                                setSubmitting(false);
                                onClose();
                            }
                        }}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {(props) => (
                            <form className="flex flex-col gap-6" onSubmit={props.handleSubmit}>
                                <div className="flex flex-col gap-2">
                                
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold">Metas semanais</span>
                                        <Input name="TotalSequence" label="Sequência total" type="number" error={props.errors.TotalSequence}/>
                                        <Input name="TotalReadingTime" label="Tempo de leitura total" type="number" error={props.errors.TotalReadingTime}/>
                                    </div>
                                </div>
                                <Button type="submit" variant="info">ADICIONAR</Button>
                            </form>
                        )}
                    </Formik>
                </div>
            )}
            <p className="text-status-error">{messageError}</p>
        </GenericModal>
    );
}
