"use client";

import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";
import { IBook, IGoals, IGoalsType } from "@/src/interfaces/interface";

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
    const [loading, setLoading] = useState(false);

    const [bookStatusSelected, setBookStatusSelected] = useState<string>("");
    const [bookPagesRead, setBookPagesRead] = useState<number>(0);
    const [bookTotalPages, setBookTotalPages] = useState<number>(0);
    const [bookGoalPartialTime, setBookGoalPartialTime] = useState<number>(0);
    const [bookGoalTotalTime, setBookGoalTotalTime] = useState<number>(0);
    const [idBookSelected, setIdBookSelected] = useState<number | string>("");
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

    function visibleInputTypeGoal(goalType: IGoalsType) {
        if(booksUser) {
            const typeSelected = booksUser.filter((book) => {
                if(book.id == idBookSelected) {
                    if(book.goals?.length) {
                        const searchType = book.goals.find((goal) => (goal.type === goalType));

                        if (searchType) {
                            setGoalType(searchType);
                            return true;
                        }
                    }
                }
                return false;
            });
            if (typeSelected?.length) return true;
        }
        return false;
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

    function getPartialPagesBook(id: string) {
        if (booksUser) {
            const pagesCount: IBook[] = booksUser.filter((book) => {
                if(book.id === id) {
                    return true;
                }
                return false;
            });
            return pagesCount[0].pagesRead;
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

    function setGoalType(goal: IGoals) {
        if(goal.type === "time") {
            setBookGoalPartialTime(goal.partial);
            setBookGoalTotalTime(goal.total);
        }
    }

    const validationSchema = Yup.object({
        bookName: Yup.string().required("É necessário escolher um livro"),
        bookStatus: Yup.string().required("É necessário escolher um estado"),
        pagesRead: Yup.number().max(bookTotalPages - bookPagesRead, `Restam apenas ${bookTotalPages - bookPagesRead} páginas`).min(0, "Não existe páginas negativas").required("Adicione uma quantidade de páginas"),
        readingTime: Yup.number().min(1, "Não possível atribuir um valor menor que um.")
    });

    const initialValues = {
        bookName: "",
        bookStatus: "",
        pagesRead: "",
        readingTime: ""
    };
  
    return (
        <GenericModal title="Progresso de leitura" onClose={onClose}>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    const formBodyPages:{
                        id: string,
                        status: string,
                        pagesRead: string,
                        goals?: {type:string, partial:string}[], 
                    } = {
                        id: values.bookName,
                        status: values.bookStatus,
                        pagesRead: values.pagesRead,                     
                    };

                    if(visibleInputTypeGoal("time")) {
    
                        if (values.readingTime) {
                            const goal:{type:string, partial:string}[] = [
                                {
                                    type: "time",
                                    partial: values.readingTime
                                }
                            ]; 
                            formBodyPages.goals = goal;        
                        }
                    }
                    setLoading(true);
                    const responseBookList = await generalRequest("/api/book-list", formBodyPages, "PATCH");
                    setLoading(false);
                    if(responseBookList?.error) {
                        setMessageError(responseBookList.error);
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
                            <div>
                                <label className="dark:text-dark-text" htmlFor="bookName">Livro<label className="text-status-error" htmlFor="bookName">*</label>
                                </label>
                                <Field
                                    as="select"
                                    className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark-text"
                                    name="bookName"
                                    id="bookName"
                                    onChange={(e: React.ChangeEvent<any>) => {
                                        props.handleChange(e);
                                    
                                        const statusBook = getStatusSelect(e.target.value);
                                        props.setFieldValue("bookStatus", statusBook);
                                        if(statusBook) setBookStatusSelected(statusBook);
                                        
                                        const pagesBook = getTotalPagesBook(e.target.value);
                                        if(pagesBook) setBookTotalPages(pagesBook);
                                        
                                        const pagesReadBook = getPartialPagesBook(e.target.value);
                                        props.setFieldValue("pagesRead", 0);
                                        if(pagesReadBook) setBookPagesRead(pagesReadBook);

                                        setIdBookSelected(e.target.value);
                                    }}
                                >
                                    <option value="" hidden selected disabled>Selecione um livro</option>
                                    {booksList().map((element) => (
                                        <option key={element.id} value={element.id}>{element.name}</option>
                                    ))}
                                </Field>
                                <div className="mt-[2px] min-h-[21px]">
                                    <ErrorMessage name="bookName" className="text-status-error" component="span"/>
                                </div>
                            </div>        
                            <div>
                                <label className="dark:text-dark-text" htmlFor="bookStatus">Estado atual<label className="text-status-error" htmlFor="bookStatus">*</label>
                                </label>
                                <Field
                                    as="select"
                                    className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark-text"
                                    name="bookStatus"
                                    id="bookStatus"
                                    onChange={(e: React.ChangeEvent<any>) => {
                                        props.handleChange(e);
                                        setBookStatusSelected(e.target.value);
                                    }}
                                    value={bookStatusSelected}
                                    requried
                                >
                                    {statusBookOptions.map((element) => {
                                        if (element.id === 1) {
                                            return (<option key={element.id} value="" hidden disabled selected>Selecione uma opção</option>);
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
                                    <label className="dark:text-dark-text" htmlFor="pagesRead">Páginas lidas<label className="text-status-error" htmlFor="pagesRead">*</label></label>
                                    <small>{`Total de páginas: ${bookTotalPages}`}</small>
                                </div>
                                <Field
                                    type="number"
                                    className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark-text"
                                    name="pagesRead"
                                    id="pagesRead"
                                />
                                <div className="mt-[2px] min-h-[21px]">
                                    <ErrorMessage name="pagesRead" className="text-status-error" component="span"/>
                                </div>
                            </div>
                            {visibleInputTypeGoal("time") && <Input name="readingTime" label="Tempo de leitura (minutos)" error={props.errors.readingTime} type="number"/>}
                        </div>
                        <div className="w-1/4 mx-auto">
                            <Button type="submit" variant="info" isLoading={loading}>SALVAR</Button>
                        </div>
                    </form>
                )}
            </Formik>
            <p className="text-status-error">{messageError}</p>
        </GenericModal>
    );
}
