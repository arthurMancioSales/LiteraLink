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

    function handleBook(value: IBookApi) {
        setBook(value);
    }

    const validationSchema = Yup.object({
        chapters: Yup.number().max(1000, "Ops! São muitos capítulos").min(0, "Não existe capítulos negativos").required("Digite o número de capítulos lidos"),
        pages: Yup.number().max(1000, "Ops! São muitas páginas lidas").min(0, "Não existe páginas negativas"),
        sequence: Yup.number().max(100, "Ops! Este número é muito grande").min(0, "Não existe sequências negativas"),
        readingTime: Yup.number().max(1440, "Ops! Tempo de leitura muito longo").min(0, "Não existe tempo negativo")
    });

    const initialValues = {
        chapters: "",
        pages: 0,
        sequence: 0,
        readingTime: 0
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
                    <div className="bg-light-tertiary p-1 rounded-md drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
                        <p className="text-lg font-bold">{book ? book.title : "Nenhum livro adicionado"}</p>
                    </div>
                    <Formik 
                        onSubmit={async (values, {setSubmitting}) => {
                            const formBody = {
                                id: book.id,
                                title: book.title,
                                image: book.image,
                                totalChapter: values.chapters,
                            };
                            
                            await generalRequest("/api/book-list", formBody, "POST");

                            if(updateUser) {
                                updateUser();
                            }

                            setSubmitting(false);
                            onClose();
                        }}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {(props) => (
                            <form className="flex flex-col gap-6" onSubmit={props.handleSubmit}>
                                <div className="flex flex-col gap-2">
                                
                                    <div className="flex flex-col gap-2">
                                        <Input name="chapters" label="Quantidade de capítulos" type="number" error={props.errors.chapters} required/>
                                        <span className="font-bold">Metas semanais</span>
                                        <Input name="pages" label="Quantidade de páginas" type="number" error={props.errors.pages}/>
                                        <Input name="sequence" label="Sequência" type="number" error={props.errors.sequence}/>
                                        <Input name="readingTime" label="Tempo de leitura" type="number" error={props.errors.readingTime}/>
                                    </div>
                                </div>
                                <Button type="submit" variant="info">ADICIONAR</Button>
                            </form>
                        )}
                    </Formik>
                </div>
            )}
        </GenericModal>
    );
}
