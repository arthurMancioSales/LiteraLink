"use client";

import { IBookApi } from "@/app/api/book-list/[apiExternal]/route";
import * as Yup from "yup";
import { generalRequest } from "@/src/functions/generalRequest";
import { ErrorMessage, Field, Formik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../../../Button";

interface PropTypes {
    value: (value: IBookApi) => void;
}

export function SearchBook({value}: PropTypes) {
    const [books, setBooks] = useState<[] | IBookApi[]>([]);
    const [showBooksSearch, setShowBooksSearch] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.querySelector("#dropdownSearchBook");
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setShowBooksSearch(false);
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
    }
    
    function renderBooksSearch() {
        if (loading || !books || !books.length || !showBooksSearch) {
            return <></>;
        }

        return (
            <div className="absolute top-[calc(100%+5px)] right-0 left-0">
                <div id="dropdownSearchBook" className="absolute flex flex-col z-20 gap-3 p-3 rounded-md overflow-y-auto max-h-[200px] w-full bg-light-secondary">
                    {books.map((book) => (
                        <div key={book.id} className="flex items-center justify-around py-1 cursor-pointer hover:bg-light-tertiary hover:rounded-md" onClick={() => handleBook(book)}>
                            <div className="h-20 w-1/5 relative">
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
        <div className="relative">
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    requestApi(values.search);                    
                    setSubmitting(false);
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <form className="flex flex-col gap-2" onSubmit={props.handleSubmit}>
                        <div className="flex items-center gap-2">
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <Field className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]" type="text" name="search" />
                                    <div><Button type="submit" variant="info">PESQUISAR</Button></div>
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
