"use client";

import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
// import { generalRequest } from "@/src/functions/generalRequest";

interface PropTypes {
    onClose: () => void;
}

export type OptionsPropsSelect = {
    id: string | number;
    name: string;
}

export function FormProgress({ onClose }: PropTypes) {
    const userContext = useContext(UserContext);
    const updateUser = userContext?.updateUser;

    const [bookStatusSelected, setBookStatusSelected] = useState<number>();

    const booksUser = userContext?.userData?.books;

    const statusBookOptions = [
        {
            id: 1,
            name: "",
        },
        {
            id: 2,
            name: "A ler",
        },
        {
            id: 3,
            name: "Lendo",
        }
    ];

    function booksList() {
        const booksListSelect: OptionsPropsSelect[] = [];

        if (booksUser) {
            booksUser.forEach(element => {
                if(element.id && (element.status !== "lido")) {
                    const book: OptionsPropsSelect = {
                        id: element.id,
                        name: element.title,
                    };                
                    booksListSelect.push(book);
                }
            });            
        }
        return booksListSelect;     
    }

    function getStatusSelect(id: string) {
        if (booksUser) {
            const status = booksUser.filter((book) => {
                if(book.id === id) {
                    return true;
                }
                return false;
            });

            if(status[0].status === "ler") {
                return (2);
            }

            if(status[0].status === "lendo") {
                return (3);
            }
        }
    }

    const validationSchema = Yup.object({
        bookName: Yup.string().required("É necessário escolher um livro"),
        bookStatus: Yup.string(),
        readingChapters: Yup.number().max(100, "O máximo são 100 capítulos").min(0, "Não existe capítulos negativos").required("Digite o número de capítulos lidos"),
        pagesRead: Yup.number().max(1000, "O máximo são 1000 páginas").min(0, "Não existe páginas negativas"),
        readingTime: Yup.number().max(1440, "O Tempo de leitura ultrapassa 1440 minutos").min(0, "Não existe tempo negativo")
    });

    const initialValues = {
        bookName: "",
        bookStatus: "",
        readingChapters: "",
        pagesRead: 0,
        readingTime: 0
    };
  
    return (
        <GenericModal title="Progresso de leitura" onClose={onClose}>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    console.log(values);
                    
                    // const formBody = {
                    //     id: values.bookName,
                    //     chaptersRead: values.readingChapters,                        
                    // };

                    // await generalRequest("/api/book-list", formBody, "PATCH");

                    // if (updateUser) {
                    //     updateUser();
                    // }

                    setSubmitting(false);
                    onClose();
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <form className="flex flex-col gap-6" onSubmit={props.handleSubmit}>
                        <div className="flex flex-col gap-2"><div>
                            <label>Livro<label className="text-status-error">*</label>
                            </label>
                            <Field
                                as="select"
                                className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]"
                                name="bookName"
                                onChange={(e: React.ChangeEvent<any>) => {
                                    props.handleChange(e);

                                    const getStatusBook = getStatusSelect(e.target.value);

                                    if(getStatusBook) setBookStatusSelected(getStatusBook);
                                }}
                            >
                                <option value="" disabled>Selecione um livro</option>
                                {booksList().map((element) => (
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                ))}
                            </Field>
                            <div className="mt-[2px] min-h-[21px]">
                                <ErrorMessage name="bookName" className="text-status-error" component="span"/>
                            </div>
                        </div>        
                        <div>
                            <label>Estado atual<label className="text-status-error">*</label>
                            </label>
                            <Field
                                as="select"
                                className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]"
                                name="bookStatus"
                                onChange={(e: React.ChangeEvent<any>) => {
                                    props.handleChange(e);
                                    setBookStatusSelected(e.target.value);
                                }}
                                value={bookStatusSelected}
                            >
                                {statusBookOptions.map((element) => (
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                ))}
                            </Field>
                            <div className="mt-[2px] min-h-[21px]">
                                <ErrorMessage name="bookStatus" className="text-status-error" component="span"/>
                            </div>
                        </div> 
                        <Input name="readingChapters" label="Capítulos lidos" type="number" error={props.errors.readingChapters} required/>
                        <Input name="pagesRead" label="Páginas lidas" error={props.errors.pagesRead} type="number"/>
                        <Input name="readingTime" label="Tempo de leitura" error={props.errors.readingTime} type="number"/>
                        </div>
                        <Button type="submit" variant="info">SALVAR</Button>
                    </form>
                )}
            </Formik>
        </GenericModal>
    );
}
