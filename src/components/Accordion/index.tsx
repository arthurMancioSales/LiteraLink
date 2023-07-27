"use client";

import { useState } from "react";
import { CardBooks } from "../CardBooks";
import * as Accordion from "@radix-ui/react-accordion";

type CardBook = {
    id: number;
    title: string,
    chaptersRead: number,
    chaptersTotal: number,
}

type PropsTypes = {
    readingBooks?: CardBook[];
    booksToRead?: CardBook[];
    readBooks?: CardBook[];
};

export const BookAccordion = ({readingBooks, booksToRead, readBooks}: PropsTypes) => {

    function renderBooks(books?: CardBook[]) {
        return (
            <>
                {books ?
                    books.map((book) => (
                        <CardBooks
                            key={book.id}
                            title={book.title}
                            description="Capítulos"
                            progress={book.chaptersRead}
                            total={book.chaptersTotal}
                        />
                    )) : <p>Não há livros</p>
                }
            </>
        );                        
    }

    const accordionOptions = [
        {
            id: 1,
            title: "Lendo",
            content: renderBooks(readingBooks),
        },
        {
            id: 2,
            title: "A ler",
            content: renderBooks(booksToRead),
        },
        {
            id: 3,
            title: "Lido",
            content: renderBooks(readBooks),
        },
    ];

    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

    const toggleAccordion = (index: number | null) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <>
            <Accordion.Root
                className="w-full h-full"
                type="single"
                defaultValue="item-1"
                collapsible
            >
                {accordionOptions.map((section) => (
                    <Accordion.Item key={section.id} value={`option-${section.id}`} className="mt-px overflow-hidden first:mt-0 first:rounded-t-md last:rounded-b-md focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_1px]">
                        <Accordion.Trigger 
                            id={`accordion-collapse-heading-${section.id}`} 
                            className="group flex flex-1 cursor-default items-center justify-between w-full p-4 border-b-2 border-light-secondary border-solid text-left text-[15px] leading-none text-light-text bg-light-primary hover:bg-gray-100 dark:focus:ring-gray-800 dark:border-gray-700 dark:bg-dark-primary dark:text-dark-text dark:hover:bg-gray-800">
                            <span>{section.title}</span>
                        </Accordion.Trigger>
                        <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                            <div className="h-full p-5 border border-b-2 border-light-secondary bg-light-tertiary dark:border-gray-700 dark:bg-gray-900">
                                <div className="flex flex-col gap-2 mb-2 text-gray-500 dark:text-gray-400">
                                    {section.content}
                                </div>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                    
                    //     <div
                    //         id={`accordion-collapse-body-${section.id}`}
                    //         className={`${activeAccordion === index ? "active" : "hidden"}`}
                    //         aria-labelledby={`accordion-collapse-heading-${section.id}`}
                    //     >
                    //         <div className="h-full p-5 border border-b-2 border-light-secondary bg-light-tertiary dark:border-gray-700 dark:bg-gray-900">
                    //             <div className="flex flex-col gap-2 mb-2 text-gray-500 dark:text-gray-400">
                    //                 {section.content}
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </Accordion.Root>
        </>
    );
};
