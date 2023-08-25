"use client";

import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";
import { IGoalsType } from "@/src/interfaces/interface";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AiOutlineQuestion } from "react-icons/ai";

interface PropTypes {
    onClose: () => void;
    bookId: string | number;
}

export type OptionsPropsSelect = {
    id: string | number;
    name: string;
}

export function FormAddGoals({ bookId, onClose }: PropTypes) {
    const userContext = useContext(UserContext);
    const updateUser = userContext?.updateUser;
    const [loading, setLoading] = useState(false);


    const books = userContext?.userData?.books;
    
    const [disabledSequence, setDisabledSequence] = useState(true);
    const [disabledReadingTime, setDisabledReadingTime] = useState(true);
    const [messageError, setMessageError] = useState("");

    function visibleInputTypeGoal(goalType: IGoalsType) {
        if(books) {
            const typeSelected = books.filter((book) => {
                if(book.id == bookId) {
                    if(book.goals?.length) {
                        const searchType = book.goals.find((goal) => (goal.type === goalType));
                        if (searchType) return true;
                    }
                }
                return false;
            });
            if (typeSelected?.length) return false;
        }
        return true;
    }

    function renderButton() {
        if(!visibleInputTypeGoal("days") && !visibleInputTypeGoal("time")) {
            return (
                <>
                    <div>
                        <p className="text-center">Você já cadastrou todas as metas deste livro</p>
                    </div>
                    <div className="flex w-full">
                        <div className="w-1/4 mx-auto">
                            <Button onClick={onClose} variant="error" isLoading={loading}>Cancelar</Button>
                        </div>
                    </div>
                </>
            );
        }
        
        return (
            <div className="flex w-full">
                <div className="w-1/4 mx-auto">
                    <Button onClick={onClose} variant="error" isLoading={loading}>Cancelar</Button>
                </div>
                <div className="w-1/4 mx-auto">
                    <Button type="submit" variant="success" isLoading={loading}>Salvar</Button>
                </div>
            </div>
        );
    }

    const validationSchema = Yup.object({
        checkboxSequence: Yup.boolean(),
        checkboxReadingTime: Yup.boolean(),
        readingTime: Yup.number().test("readingTime", "A quantidade total deve ser maior que zero", function(value) {
            if (this.parent.checkboxReadingTime) {
                return Yup.number().min(1).required().isValidSync(value);
            }
            return true;
        }),
    });

    const initialValues = {
        checkboxSequence: false,
        checkboxReadingTime: false,
        readingTime: ""
    };
  
    return (
        <GenericModal title="Adicionar nova meta" onClose={onClose}>
            <div className="flex flex-col gap-2">
                <Formik 
                    onSubmit={async (values, {setSubmitting}) => {
                        if(disabledSequence && disabledReadingTime) {
                            setMessageError("Pelo menos uma das opções deve ser escolhida");
                            return;
                        }

                        const goals = [];

                        if (!disabledSequence) {
                            goals.push({
                                type: "days",
                            });
                        }

                        if (!disabledReadingTime) {
                            goals.push({
                                type: "time",
                                total: values.readingTime
                            });
                        }

                        const formBody = {
                            id: bookId,
                            goals                     
                        };
                        setLoading(true);
                        const response = await generalRequest("/api/book-goals", formBody, "POST");
                        setLoading(false);
                        if(response?.error) {
                            setMessageError(response.error);
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
                            <Tooltip.Provider>
                                <div className="flex flex-col gap-2">
                                    {visibleInputTypeGoal("days") && (
                                        
                                        <div className="flex gap-2">
                                            <Field
                                                type="checkbox"
                                                name="checkboxSequence"
                                                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                                                    props.handleChange(e);
                                                    setDisabledSequence(!disabledSequence);
                                                }}
                                            />
                                            <div className="flex items-center justify-between w-full">
                                                <p>{"Sequência diária"}</p>
                                                <Tooltip.Root
                                                    delayDuration={10}
                                                >
                                                    <Tooltip.Trigger asChild>
                                                        <button className="text-light-text shadow-blackA7 hover:bg-brand inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                                                            <AiOutlineQuestion size={12}></AiOutlineQuestion>
                                                        </button>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Portal>
                                                        <Tooltip.Content
                                                            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-1 py-1 text-[15px] leading-none will-change-[transform,opacity] z-50 outline-1 outline w-32"
                                                            sideOffset={5}
                                                        >
                                                            <p>Número de dias seguidos que você planeja ler esse livro</p>
                                                            <Tooltip.Arrow className="fill-white" />
                                                        </Tooltip.Content>
                                                    </Tooltip.Portal>
                                                </Tooltip.Root>
                                            </div>
                                        </div>
                                    )}
                                    {visibleInputTypeGoal("time") && (
                                        <div>
                                            <div className="flex gap-2">
                                                <Field
                                                    type="checkbox"
                                                    name="checkboxReadingTime"
                                                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                                                        props.handleChange(e);
                                                        setDisabledReadingTime(!disabledReadingTime);
                                                    }}
                                                />
                                                <div className="flex items-center justify-between w-full">
                                                    <p>{"Tempo de leitura (minutos)"}</p>

                                                    <Tooltip.Root
                                                        delayDuration={10}
                                                    >
                                                        <Tooltip.Trigger asChild>
                                                            <button className="text-light-text shadow-blackA7 hover:bg-brand inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                                                                <AiOutlineQuestion size={12}></AiOutlineQuestion>
                                                            </button>
                                                        </Tooltip.Trigger>
                                                        <Tooltip.Portal>
                                                            <Tooltip.Content
                                                                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-1 py-1 text-[15px] leading-none will-change-[transform,opacity] z-50 outline-1 outline w-32"
                                                                sideOffset={5}
                                                            >
                                                                <p>Tempo mínimo que você gostaria de ler</p>
                                                                <Tooltip.Arrow className="fill-white" />
                                                            </Tooltip.Content>
                                                        </Tooltip.Portal>
                                                    </Tooltip.Root>
                                                </div>
                                            </div>
                                            {!disabledReadingTime && (
                                                <div>
                                                    <Field
                                                        type="number"
                                                        className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] disabled:text-light-secondary dark:bg-dark-secondary"
                                                        name="readingTime"
                                                        disabled={disabledReadingTime}
                                                    />
                                                    <div className="mt-[2px] min-h-[21px]">
                                                        <ErrorMessage name="readingTime" className="text-status-error" component="span"/>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {renderButton()}
                            </Tooltip.Provider>
                        </form>
                    )}
                </Formik>
                <p className="text-status-error">{messageError}</p>
            </div>
        </GenericModal>
    );
}
