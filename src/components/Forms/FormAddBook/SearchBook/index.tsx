"use client";

import { IBookApi } from "@/app/api/book-list/[apiExternal]/route";
import * as Yup from "yup";
import { generalRequest } from "@/src/functions/generalRequest";
import { ErrorMessage, Field, Formik } from "formik";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../Button";

interface PropTypes {
    value: (value: IBookApi) => void;
}

export function SearchBook({value}: PropTypes) {
    const [books, setBooks] = useState<IBookApi[]>([]);
    const [showBooksSearch, setShowBooksSearch] = useState(false);
    const [loading, setLoading] = useState(false);

    const formRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.querySelector("#dropdownSearchBook");
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setShowBooksSearch(false);
                formRef.current && formRef.current.classList.remove("h-full");
                formRef.current && formRef.current.classList.add("h-fit");
            }
        };
    
        if (showBooksSearch) {
            document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showBooksSearch]);
    
    function handleBook(book: IBookApi) {
        value(book);
        setShowBooksSearch(false);        
        formRef.current && formRef.current.classList.remove("h-full");
        formRef.current && formRef.current.classList.add("h-fit");
    }
    
    function renderBooksSearch() {
        if (loading || !books || !showBooksSearch) {
            return <></>;
        }

        if (!books.length) {
            return (
                <div className="absolute top-[calc(100%+5px)] right-0 left-0">
                    <div id="dropdownSearchBook" className="absolute flex flex-col z-20 gap-3 p-2 rounded-md overflow-y-auto max-h-[200px] w-full bg-light-tertiary dark:bg-dark-primary">
                        <p>Nenhum livro encontrado</p>
                    </div> 
                </div>
            );
        }

        return (
            <div className="absolute left-0 right-0 h-[calc(100%-64px)] top-14">
                <div id="dropdownSearchBook" className="absolute z-20 flex flex-col w-full h-full gap-3 p-2 mt-2 overflow-y-auto rounded-md bg-light-tertiary dark:bg-dark-primary">
                    {books.map((book) => (
                        <div key={book.id} className="flex items-center justify-around py-2 rounded-md cursor-pointer bg-light-primary hover:bg-buttonHover dark:bg-dark-secondary" onClick={() => handleBook(book)}>
                            <div className="h-[125px] w-1/5 relative">
                                <Image className="object-cover" src={book.image} alt="" fill/>                
                            </div>
                            <p className="w-2/3">{book.title}</p>
                        </div>
                    ))}
                </div> 
            </div>
        );        
    }

    async function requestApi(search: string) {
        if (search.length >= 3) {
            setLoading(true);
            const bookSearch: IBookApi[] = await generalRequest(`/api/book-list/${search}`);

            setShowBooksSearch(true);
            formRef.current && formRef.current.classList.remove("h-fit");
            formRef.current && formRef.current.classList.add("h-full");
            setBooks(bookSearch);
            setLoading(false);
        }
    }

    const validationSchema = Yup.object({
        search: Yup.string().required("É necessário escolher um livro"),
    });

    const initialValues = {
        search: "",
    };
  
    return (
        <div className="relative h-full" ref={formRef}>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    requestApi(values.search);                    
                    setSubmitting(false);
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <form className="flex flex-col h-full gap-2" onSubmit={props.handleSubmit}>
                        <div className="flex items-center gap-2">
                            <div className="w-full">
                                <div className="flex items-center gap-2 pt-2">
                                    <Field className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark-text" type="text" name="search" />
                                    <div><Button type="submit" variant="info" isLoading={loading}>PESQUISAR</Button></div>
                                </div>
                                <div className="mt-[2px] min-h-[21px]">
                                    <ErrorMessage className="text-status-error" component="span" name="search" />
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            {showBooksSearch && (renderBooksSearch())}
        </div>
    );
}
