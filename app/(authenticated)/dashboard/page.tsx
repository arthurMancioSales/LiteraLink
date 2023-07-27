"use client";

import { Accordion } from "@/src/components/Accordion";
import { Button } from "@/src/components/Button";
import { CardBooks } from "@/src/components/CardBooks";
import { Sidebar } from "@/src/components/Sidebar";

export default function Home() {
    const communities = [
        {
            id: 1,
            name: "Teste"
        },
        {
            id: 2,
            name: "Teste2"
        }
    ];

    return (
        <div className="flex w-full bg-light-secondary dark:bg-dark-tertiary">
            <div className="flex">

            </div>
            <div className="flex w-1/4">
                <Accordion
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
                        }
                    ]}
                />
            </div>
        </div>
    );
}
