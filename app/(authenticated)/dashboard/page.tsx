"use client";

import { BookAccordion } from "@/src/components/Accordion";
import { CardBooks } from "@/src/components/CardBooks";
import { TextLoading } from "@/src/components/Loaders/TextLoading";
import { UserGoals } from "@/src/components/UserGoals";
import { IBook, IUser } from "@/src/interfaces/interface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineBook, AiOutlineFieldTime } from "react-icons/ai";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { FavoriteSkeleton } from "@/src/components/CardBooks/favoriteSkeleton";
import { BiMedal } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import { generalRequest } from "@/src/functions/generalRequest";
import { ObjectId } from "mongodb";

export default function Dashboard() {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [favoriteBook, setFavoriteBook] = useState<IBook[] | null>(null);


    async function handleBookFavorite(id: number | string) {
        const handleFavorite: Array<number | string | ObjectId> = [];

        userData?.books.forEach((book) => {
            if (book.favorite && book.id !== id) {
                handleFavorite.push(book.id);
                book.favorite = false;
            }

            if (book.id === id) {
                handleFavorite.push(book.id);
                book.favorite = true;
            }
        });

        if (userData) {
            await patchFavoriteBook(handleFavorite[0], handleFavorite[1]);
            setFavoriteBook(userData.books.filter(book => book.favorite));
        }
    }

    async function patchFavoriteBook(idBookBefore: number | string | ObjectId, idBookAfter: number | string | ObjectId) {
        const objAfter = {
            id: idBookBefore,
            favorite: false
        };

        const objBefore = {
            id: idBookAfter,
            favorite: true
        };
        await generalRequest("/api/book-list", objBefore, "PATCH");
        await generalRequest("/api/book-list", objAfter, "PATCH");
    }

    useEffect(() => {
        async function getUserData() {
            const user: IUser = await generalRequest("/api/user");
            setUserData(user);
            setFavoriteBook(user.books.filter(book => book.favorite));
            setLoading(false);
        }

        getUserData();
    }, []);

    return (
        <div className="flex w-full max-h-screen px-4 py-4 bg-light-secondary dark:bg-dark-tertiary overflow-clip">
            <div className="flex flex-col w-3/4 h-full gap-4 mr-2">
                <div className="flex justify-between w-full p-4 rounded-md h-[calc(25%-8px)] bg-light-tertiary dark:bg-dark-primary">
                    <UserGoals
                        icon={<AiOutlineBook size={50} />}
                        value={userData ? userData?.statistics.booksRead : 0}
                        loading={loading}
                    >
                        Livros Lidos
                    </UserGoals>
                    <UserGoals
                        icon={<AiOutlineFieldTime size={50} />}
                        value={userData ? userData?.statistics.readingTime : 0}
                        loading={loading}
                        complement="minutos"
                    >
                        Tempo de Leitura
                    </UserGoals>
                    <UserGoals
                        icon={<BiMedal size={50} />}
                        value={userData ? userData?.statistics.maxSequence : 0}
                        loading={loading}
                        complement="dias"
                    >
                        Maior Sequência
                    </UserGoals>
                    <UserGoals
                        icon={<BsFire size={50} />}
                        value={userData ? userData?.statistics.actualSequence : 0}
                        loading={loading}
                        complement="dias"
                    >
                        Sequência atual
                    </UserGoals>
                    <UserGoals
                        icon={<AiFillCheckCircle size={50} />}
                        value={userData ? userData?.statistics.goalsAchieved : 0}
                        loading={loading}
                    >
                        Metas Cumpridas
                    </UserGoals>
                </div>
                <div className="flex flex-col w-full gap-4 p-4 rounded-md h-[calc(75%-8px)] bg-light-tertiary dark:bg-dark-primary">
                    <div>
                        {loading
                            ?
                            <TextLoading size="large"></TextLoading>
                            :
                            <p className="text-2xl dark:text-dark-text">{favoriteBook?.[0].title}</p>
                        }
                    </div>
                    <div className="w-full h-[calc(100%-64px)]">
                        <div className="flex w-full h-full gap-4">
                            <div className="relative w-1/3 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] h-full">
                                {loading
                                    ?
                                    <div className="w-full h-full rounded-l-md bg-light-secondary dark:bg-dark-secondary animate-pulse"></div>
                                    :
                                    <Image
                                        src={favoriteBook ? favoriteBook[0].image : ""}
                                        alt="User favorite book"
                                        fill
                                        className="object-cover rounded-l-md"
                                    >
                                    </Image>
                                }
                            </div>
                            <div className="w-2/3">
                                <ScrollArea.Root
                                    className="w-full h-full overflow-hidden"
                                    type="always"
                                >
                                    <ScrollArea.Viewport className="flex flex-col w-full max-h-full mb-2 text-gray-500 rounded dark:text-gray-400">
                                        <div className="flex flex-col pr-1 pb-1 max-w-[90%] h-full gap-4">
                                            <div className="flex flex-col w-full gap-4">
                                                <p>Progresso total</p>
                                                {loading ?
                                                    <FavoriteSkeleton />
                                                    :
                                                    <CardBooks
                                                        variant="secondary"
                                                        description="Capítulos"
                                                        progress={favoriteBook?.[0].chaptersRead ? favoriteBook[0].chaptersRead : 0}
                                                        total={favoriteBook ? favoriteBook[0].totalChapter : 0}
                                                    />
                                                }
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-row justify-between">
                                                    <p>Metas semanais</p>
                                                    <p>Realizadas: {favoriteBook?.[0].goalsAchieved}</p>
                                                </div>
                                                {
                                                    favoriteBook?.[0].goals ? favoriteBook?.[0].goals.map((goal, index) => (
                                                        <CardBooks
                                                            key={`goal-${index}`}
                                                            variant="secondary"
                                                            description={goal.type == "days" ? "Sequência" : goal.type == "time" ? "Tempo de leitura" : "Páginas"}
                                                            complement={goal.type == "days" ? "dias" : goal.type == "time" ? "minutos" : "páginas"}
                                                            progress={goal.partial}
                                                            total={goal.total}
                                                        />
                                                    ))
                                                        :
                                                        <FavoriteSkeleton />
                                                }
                                            </div>
                                        </div>
                                    </ScrollArea.Viewport>
                                    <ScrollArea.Scrollbar
                                        className="flex select-none touch-none p-0.5 mr-2 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                                        orientation="vertical"
                                    >
                                        <ScrollArea.Thumb className="flex-1 bg-light-secondary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] dark:bg-dark-secondary" />
                                    </ScrollArea.Scrollbar>
                                    <ScrollArea.Corner className="bg-black" />
                                </ScrollArea.Root>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex w-1/4 h-full ml-2 overflow-hidden rounded-md bg-light-tertiary dark:bg-dark-primary">
                <BookAccordion userBooks={userData?.books} loading={loading} onClick={handleBookFavorite} />
            </div>
        </div>
    );
}
