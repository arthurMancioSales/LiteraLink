"use client";

import { BookAccordion } from "@/src/components/Accordion";

export default function Home() {

    return (
        <div className="flex w-full px-4 py-4 bg-light-secondary dark:bg-dark-tertiary">
            <div className="flex flex-col w-3/4 h-full mr-2">
                <div className="w-full mb-2 rounded-md h-1/4 bg-light-tertiary dark:bg-dark-primary">

                </div>
                <div className="w-full mt-2 rounded-md h-3/4 bg-light-tertiary dark:bg-dark-primary">
                    
                </div>
            </div>
            <div className="flex w-1/4 h-full ml-2 rounded-md bg-light-tertiary dark:bg-dark-primary">
                <BookAccordion
                    readingBooks={[
                        {
                            id: 1,
                            title: "Livro",
                            chaptersRead: 7,
                            chaptersTotal: 14,
                        },
                        {
                            id: 1,
                            title: "Livro2",
                            chaptersRead: 4,
                            chaptersTotal: 14,
                        },
                    ]}
                />
            </div>
        </div>
    );
}
