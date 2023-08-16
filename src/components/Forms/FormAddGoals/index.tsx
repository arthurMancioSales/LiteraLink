"use client";

import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";
import { IGoalsType } from "@/src/interfaces/interface";

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
                <p className="text-center">Você já cadastrou todas as metas deste livro</p>
            );
        }
        
        return (
            <Button type="submit" variant="info">SALVAR</Button>
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
        <GenericModal title="Adição de metas do livro" onClose={onClose}>
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

                        const response = await generalRequest("/api/book-goals", formBody, "POST");

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
                                        <p>{"Sequencia (diária)"}</p>
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
                                            <p>{"Tempo de leitura (minutos)"}</p>
                                        </div>
                                        <div>
                                            <Field
                                                type="number"
                                                className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] disabled:text-light-secondary"
                                                name="readingTime"
                                                disabled={disabledReadingTime}
                                            />
                                            <div className="mt-[2px] min-h-[21px]">
                                                <ErrorMessage name="readingTime" className="text-status-error" component="span"/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {renderButton()}
                        </form>
                    )}
                </Formik>
                <p className="text-status-error">{messageError}</p>
            </div>
        </GenericModal>
    );
}
