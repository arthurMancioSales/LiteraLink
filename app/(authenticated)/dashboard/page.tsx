"use client";

import { BookAccordion } from "@/src/components/Accordion";
import { CardBooks } from "@/src/components/CardBooks";
import { TextLoading } from "@/src/components/Loaders/TextLoading";
import { UserGoals } from "@/src/components/UserGoals";
import { IBook, IGoals, IGoalsType } from "@/src/interfaces/interface";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineBook, AiOutlineFieldTime } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { FavoriteSkeleton } from "@/src/components/CardBooks/favoriteSkeleton";
import { BiMedal } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import { generalRequest } from "@/src/functions/generalRequest";
import { UserContext } from "../layout";
import { FormAddGoals } from "@/src/components/Forms/FormAddGoals";
import { RectangleSkeleton } from "@/src/components/Loaders/RectangleSkeleton";
import { CircleSkeleton } from "@/src/components/Loaders/CircleSkeleton";
import { FormEditGoals } from "@/src/components/Forms/FormEditGoals";

export default function Dashboard() {
    const userContext = useContext(UserContext);
    
    const userData = userContext?.userData;
    const loading = userContext ? userContext.loading : false;
    const updateUser = userContext?.updateUser;

    const [openModalAddGoals, setOpenModalAddGoals] = useState(false);
    const [openModalEditGoals, setOpenModalEditGoals] = useState(false);
    const [goal, setGoal] = useState<IGoals>();
    
    const [favoriteBook, setFavoriteBook] = useState<IBook | undefined>(undefined);

    useEffect(() => {
        if(userData?.books) {
            setFavoriteBook(userData.books.filter(book => book.favorite)[0]);
        } else {
            setFavoriteBook(undefined);
        }
    }, [userData?.books]);
    
    async function handleBookFavorite(id: number | string) {
        if (userData) {
            const handleBookFavorite = userData.books.filter((book) => {
                if (book.id === id) {
                    book.favorite = true;
                    return true;
                }
                return false;
            });

            if (handleBookFavorite.length) {
                await patchFavoriteBook(handleBookFavorite[0].id);
                setFavoriteBook(handleBookFavorite[0]);
            }

            if (updateUser) {
                updateUser();
            }
        }
    }

    async function patchFavoriteBook(IdFavoriteBook: number | string ) {
        const bookFavorite = {
            id: IdFavoriteBook,
            favorite: true,
        };
        await generalRequest("/api/book-list", bookFavorite, "PATCH");
    }

    async function editGoalBook(typeGoal: IGoalsType ) {
        if(favoriteBook && favoriteBook.goals?.length) {
            favoriteBook.goals.forEach((goal) => {
                if(goal.type === typeGoal) {
                    setGoal(goal);
                    setOpenModalEditGoals(true);
                }
            });
        }
    }

    async function deleteGoalBook(typeGoal: IGoalsType ) {
        if(favoriteBook) {
            const requestBody = {
                id: favoriteBook.id,
                goals: [{type: typeGoal}]
            };
            
            const response = await generalRequest("/api/book-goals", requestBody, "DELETE");

            if(response?.error) {
                console.error("Failed request");
            } else {
                if(updateUser) {
                    updateUser();
                }
            }
        }
    }

    if (loading) {
        return (
            <>
                <div className="flex w-full max-h-screen px-4 py-4 bg-light-secondary dark:bg-dark-tertiary overflow-clip">
                    <div className="flex flex-col w-3/4 h-full gap-4 mr-2">
                        <div className="flex justify-between w-full p-4 rounded-md h-[calc(25%-8px)] bg-light-tertiary dark:bg-dark-primary">
                            <div className="w-[130px]"><RectangleSkeleton/></div>
                            <div className="w-[130px]"><RectangleSkeleton/></div>
                            <div className="w-[130px]"><RectangleSkeleton/></div>
                            <div className="w-[130px]"><RectangleSkeleton/></div>
                            <div className="w-[130px]"><RectangleSkeleton/></div>
                        </div>
                        <div className="flex flex-col w-full gap-4 p-4 rounded-md h-[calc(75%-8px)] bg-light-tertiary dark:bg-dark-primary">
                            <div>
                                <TextLoading size="large"></TextLoading>
                            </div>
                            <div className="w-full h-[calc(100%-64px)]">
                                <div className="flex w-full h-full gap-4">
                                    <div className="relative w-1/3 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] h-full">
                                        <div className="w-full h-full rounded-l-md bg-light-secondary dark:bg-dark-secondary animate-pulse"></div>
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
                                                        <FavoriteSkeleton />
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex flex-row justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <p>Metas</p>
                                                                <CircleSkeleton size={16}/>
                                                            </div>
                                                            <p>Realizadas: {favoriteBook ? favoriteBook.goalsAchieved : 0}</p>
                                                        </div>
                                                        <FavoriteSkeleton />
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
            </>
        );
    }

    function renderGoalsGlobal() {
        return(
            <>
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
            </>            
        );
                
    }

    function renderGoals() {
        if (loading) {
            return (
                <FavoriteSkeleton />
            );
        }

        if(!favoriteBook) {
            return (
                <p>Não há livros cadastrados</p>
            );
        }

        if(!favoriteBook.goals?.length) {
            return (
                <p>Não há metas cadastradas</p>
            );
        }
        

        function handleGoalTypeAndComplement(goalType: IGoalsType) {
            switch (goalType) {
                case "days": {
                    const goalTypeSelected = {
                        name: "Sequência (semanal)",
                        complement: "dias"
                    };                               
                    return goalTypeSelected;
                }
                case "time": {
                    const goalTypeSelected = {
                        name: "Tempo de leitura",
                        complement: "minutos"
                    };                               
                    return goalTypeSelected;
                }
                case "chapters": {
                    const goalTypeSelected = {
                        name: "Capítulos",
                        complement: "Capítulos"
                    };                               
                    return goalTypeSelected;
                }
            }                       
        }
  
        return(
            <>
                {
                    favoriteBook.goals.map((goal) => {
                        const goalType = handleGoalTypeAndComplement(goal.type);
                        
                        return (
                            <CardBooks
                                key={goal.type}
                                id={goal.type}
                                variant="secondary"
                                description={goalType.name}
                                complement={goalType.complement}
                                progress={goal.partial}
                                total={goal.total}
                                onEdit={editGoalBook}
                                onDelete={deleteGoalBook}
                            />
                        );
                    })
                }
            </>
        );
    }

    function renderModalAddGoals() {
        if (!openModalAddGoals) return <></>;

        if (!favoriteBook?.id) return <></>;

        return (
            <FormAddGoals bookId={favoriteBook.id} onClose={() => setOpenModalAddGoals(false)}/>
        );
    }

    function renderModalEditGoals() {
        if (!openModalEditGoals) return <></>;

        if (!favoriteBook?.id || !goal) return <></>;

        return (
            <FormEditGoals bookId={favoriteBook.id} goal={goal} onClose={() => setOpenModalEditGoals(false)}/>
        );                
    }

    return (
        <>
            <div className="flex w-full max-h-screen px-4 py-4 bg-light-secondary dark:bg-dark-tertiary overflow-clip">
                <div className="flex flex-col w-2/3 h-full gap-4 mr-2">
                    <div className="flex justify-between w-full p-4 rounded-md h-[calc(25%-8px)] bg-light-tertiary dark:bg-dark-primary">
                        {renderGoalsGlobal()}
                    </div>
                    <div className="flex flex-col w-full gap-4 p-4 rounded-md h-[calc(75%-8px)] bg-light-tertiary dark:bg-dark-primary">
                        <p className="text-2xl dark:text-dark-text">{ favoriteBook ? favoriteBook.title : "Não há livros"}</p>
                        <div className="w-full h-[calc(100%-64px)]">
                            <div className="flex w-full h-full gap-4">
                                <div className="relative w-1/3 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] h-full">
                                    <Image
                                        src={favoriteBook ? favoriteBook.image : ""}
                                        alt="User favorite book"
                                        fill
                                        className="object-cover rounded-l-md"
                                    >
                                    </Image>
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
                                                    <CardBooks
                                                        variant="secondary"
                                                        description="Páginas"
                                                        progress={favoriteBook?.pagesRead ? favoriteBook.pagesRead : 0}
                                                        total={favoriteBook ? favoriteBook.totalPages : 0}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-row justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <p>Metas</p>
                                                            <MdAddCircle className="cursor-pointer fill-light-text dark:fill-dark-text" size={20} onClick={() => setOpenModalAddGoals(true)}/>
                                                        </div>
                                                        <p>Realizadas: {favoriteBook ? favoriteBook.goalsAchieved : 0}</p>
                                                    </div>
                                                    {renderGoals()}
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
                <div className="flex w-1/3 h-full ml-2 overflow-hidden rounded-md bg-light-tertiary dark:bg-dark-primary">
                    <BookAccordion userBooks={userData?.books} loading={loading} onClick={handleBookFavorite} />
                </div>
            </div>
            {renderModalAddGoals()}
            {renderModalEditGoals()}
        </>
    );
}
