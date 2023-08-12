"use client";

import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";

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

    const [bookStatusSelected, setBookStatusSelected] = useState<string>("");
    const [bookPagesRead, setBookPagesRead] = useState<number | string>("");
    const [bookTotalPages, setBookTotalPages] = useState<number>(0);
    const [messageError, setMessageError] = useState("");

    const booksUser = userContext?.userData?.books;

    const statusBookOptions = [
        {
            id: 1,
            name: "",
        },
        {
            id: 2,
            name: "A ler",
            value: "ler",
        },
        {
            id: 3,
            name: "Lendo",
            value: "lendo",
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
                return (statusBookOptions[1].value);
            }

            if(status[0].status === "lendo") {
                return (statusBookOptions[2].value);
            }
        }
    }

    function getTotalPagesBook(id: string) {
        if (booksUser) {
            const pagesCount = booksUser.filter((book) => {
                if(book.id === id) {
                    return true;
                }
                return false;
            });
            return pagesCount[0].totalPages;
        }
    }

    const validationSchema = Yup.object({
        bookName: Yup.string().required("É necessário escolher um livro"),
        bookStatus: Yup.string(),
        pagesRead: Yup.number().max(bookTotalPages, `O máximo são ${bookTotalPages} páginas`).min(0, "Não existe páginas negativas").required("Adicione uma quantidade de páginas"),
        readingTime: Yup.number().max(1440, "O Tempo de leitura ultrapassa 1440 minutos").min(0, "Não existe tempo negativo")
    });

    const initialValues = {
        bookName: "",
        bookStatus: "",
        pagesRead: "",
        readingTime: 0
    };
  
    return (
        <GenericModal title="Progresso de leitura" onClose={onClose}>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    const formBody = {
                        id: values.bookName,
                        status: values.bookStatus,
                        pagesRead: values.pagesRead,                        
                    };

                    const response = await generalRequest("/api/book-list", formBody, "PATCH");

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
                        <div className="flex flex-col gap-2"><div>
                            <label>Livro<label className="text-status-error">*</label>
                            </label>
                            <Field
                                as="select"
                                className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]"
                                name="bookName"
                                onChange={(e: React.ChangeEvent<any>) => {
                                    props.handleChange(e);
                                    
                                    const statusBook = getStatusSelect(e.target.value);
                                    props.setFieldValue("bookStatus", statusBook);
                                    if(statusBook) setBookStatusSelected(statusBook);

                                    const pagesBook = getTotalPagesBook(e.target.value);
                                    if(pagesBook) setBookTotalPages(pagesBook);
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
                                {statusBookOptions.map((element) => {
                                    if (element.id === 0) {
                                        return (<option key={element.id} value={element.value} disabled>{element.name}</option>);
                                    }
                                    return (<option key={element.id} value={element.value}>{element.name}</option>);
                                })} 
                            </Field>
                            <div className="mt-[2px] min-h-[21px]">
                                <ErrorMessage name="bookStatus" className="text-status-error" component="span"/>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <label>Páginas lidas<label className="text-status-error">*</label></label>
                                <small>{`Total de páginas: ${bookTotalPages}`}</small>
                            </div>
                            <Field
                                type="number"
                                className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]"
                                name="pagesRead"
                                onChange={(e: React.ChangeEvent<any>) => {
                                    props.handleChange(e);
                                    setBookPagesRead(e.target.value);
                                }}
                                value={bookPagesRead}
                            />
                            <div className="mt-[2px] min-h-[21px]">
                                <ErrorMessage name="pagesRead" className="text-status-error" component="span"/>
                            </div>
                        </div>
                        <Input name="readingTime" label="Tempo de leitura (minutos)" error={props.errors.readingTime} type="number"/>
                        </div>
                        <Button type="submit" variant="info">SALVAR</Button>
                    </form>
                )}
            </Formik>
            <p className="text-status-error">{messageError}</p>
        </GenericModal>
    );
}
