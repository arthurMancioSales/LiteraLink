"use client";

import { CardBooks } from "../CardBooks";
import * as Accordion from "@radix-ui/react-accordion";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { BiChevronDown } from "react-icons/bi";
import { IBook } from "@/src/interfaces/interface";
import { CardBooksSkeleton } from "../CardBooks/skeleton";

interface IBookAccordion {
    userBooks: IBook[] | undefined;
    loading: boolean;
    onClick?: (id: number | string) => void;
}

export function BookAccordion({ userBooks, loading, onClick }: IBookAccordion) {

    function renderLoading() {
        return (
            <CardBooksSkeleton />
        );
    }

    function renderBooks(books: IBook[] | undefined) {

        if (books?.length === 0) {
            return <p>Não há livros</p>;
        }

        const booksNotFavorite = userBooks?.filter(book => !book.favorite);

        return (
            <>
                {booksNotFavorite ?
                    booksNotFavorite.map((book) => (
                        <div
                            key={book.id}
                            className="mt-4 first:mb-4 first:mt-0"
                        >
                            <CardBooks
                                id={book.id}
                                title={book.title}
                                description="Capítulos"
                                progress={book.chaptersRead ? book.chaptersRead : 0}
                                total={book.totalChapter}
                                onClick={onClick}
                            />
                        </div>
                    )) : <></>
                }
            </>
        );
    }

    const accordionOptions = [
        {
            id: 1,
            title: "A ler",
            content: loading ? renderLoading() : renderBooks(userBooks?.filter(book => book.status == "ler")),
        },
        {
            id: 2,
            title: "Lendo",
            content: loading ? renderLoading() : renderBooks(userBooks?.filter(book => book.status == "lendo")),
        },
        {
            id: 3,
            title: "Lido",
            content: loading ? renderLoading() : renderBooks(userBooks?.filter(book => book.status == "lido")),
        },
    ];

    return (
        <>
            <Accordion.Root
                className="w-full h-full overflow-hidden"
                type="single"
                defaultValue="option-0"
                collapsible
            >
                {accordionOptions.map((section, index) => (
                    <Accordion.Item key={`option-${index}`} value={`option-${index}`} className="mt-px overflow-hidden first:mt-0 first:rounded-t-md last:rounded-b-md focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_1px] data-[state=open]:h-[calc(100%-(var(--accordionHeight)*2))] data-[state=open]:animate-slideDownAccordionContainer data-[state=closed]:animate-slideUpAccordionContainer ">
                        <Accordion.Trigger
                            id={`accordion-collapse-heading-${section.id}`}
                            className="group flex flex-1 cursor-default items-center justify-between w-full p-4 border-b-2 border-light-secondary dark:border-dark-secondary border-solid text-left text-[var(--accordionTitle)] leading-none text-light-text bg-light-primary hover:bg-gray-100 dark:focus:ring-dark-secondary dark:bg-dark-primary dark:text-dark-text dark:hover:bg-gray-800">
                            <span>{section.title}</span>
                            <BiChevronDown className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"></BiChevronDown>
                        </Accordion.Trigger>
                        <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden h-[calc(100%-(var(--accordionHeight)))]">
                            <ScrollArea.Root className="h-full p-5 overflow-hidden border border-b-2 border-light-secondary bg-light-tertiary dark:bg-dark-primary" type="always">
                                <ScrollArea.Viewport className="w-[90%] pr-1 pb-1 max-h-full rounded flex flex-col mb-2 text-gray-500 dark:text-gray-400">
                                    {section.content}
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar
                                    className="flex select-none touch-none p-0.5 mr-2 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                                    orientation="vertical"
                                >
                                    <ScrollArea.Thumb className="flex-1 bg-light-secondary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] dark:bg-dark-secondary" />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Corner className="bg-black" />
                            </ScrollArea.Root>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </>
    );
}
