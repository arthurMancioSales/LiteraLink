"use client";

import { useState } from "react";
import { CardBooks } from "../CardBooks";

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

export const Accordion = ({readingBooks, booksToRead, readBooks}: PropsTypes) => {

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
        <div id="accordion-collapse" data-accordion="collapse" className="w-full">
            {accordionOptions.map((section, index) => (
                <div key={section.id}>
                    <h2
                        id={`accordion-collapse-heading-${section.id}`}
                    >
                        <button
                            type="button"
                            className="flex items-center justify-between w-full p-5 font-medium text-left text-light-text bg-light-primary hover:bg-gray-100 dark:focus:ring-gray-800 dark:border-gray-700 dark:bg-dark-primary dark:text-dark-text dark:hover:bg-gray-800"
                            data-accordion-target={`#accordion-collapse-body-${section.id}`}
                            aria-expanded={activeAccordion === index}
                            aria-controls={`accordion-collapse-body-${section.id}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <span>{section.title}</span>
                            <svg
                                data-accordion-icon
                                className="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id={`accordion-collapse-body-${section.id}`}
                        className={`${activeAccordion === index ? "active" : "hidden"}`}
                        aria-labelledby={`accordion-collapse-heading-${section.id}`}
                    >
                        <div className="p-5 border border-b-0 border-gray-200 bg-light-tertiary dark:border-gray-700 dark:bg-gray-900">
                            <div className="flex flex-col gap-2 mb-2 text-gray-500 dark:text-gray-400">
                                {section.content}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
