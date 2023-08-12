"use client";

import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";

interface PropTypes {
    onClose: () => void;
}

export type OptionsPropsSelect = {
    id: string | number;
    name: string;
}

// type IGoalsType = "days" | "time" | "chapters";

export function FormAddGoalsWeek({ onClose }: PropTypes) {
    const userContext = useContext(UserContext);
    const updateUser = userContext?.updateUser;

    const [disabledSequence, setDisabledSequence] = useState(true);
    const [disabledReadingTime, setDisabledReadingTime] = useState(true);
    const [messageError, setMessageError] = useState("");

    const validationSchema = Yup.object({
        sequence: Yup.number().min(0, "Não existe dias negativos"),
        readingTime: Yup.number().min(0, "Não existe tempo negativo")
    });

    const initialValues = {
        checkboxSequence: false,
        checkboxReadingTime: false,
        sequence: 0,
        readingTime: 0
    };
  
    return (
        <GenericModal title="Adição de metas semanais" onClose={onClose}>
            <div className="flex flex-col gap-2">
                <Formik 
                    onSubmit={async (values, {setSubmitting}) => {
                        const formBody = {
                            sequence: values.sequence,
                            pagesRead: values.readingTime,                        
                        };

                        if(disabledSequence && disabledReadingTime) {
                            setMessageError("Pelo menos uma das opções deve ser escolhida");
                            return;
                        } 

                        // const response = await generalRequest("/api/book-list", formBody, "PATCH");

                        // if(response?.error) {
                        //     setMessageError(response.error);
                        // } else {
                        //     if(updateUser) {
                        //         updateUser();
                        //     }

                    //     setSubmitting(false);
                    //     onClose();
                    // }
                    }}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {(props) => (
                        <form className="flex flex-col gap-6" onSubmit={props.handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <div>
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
                                    <div>
                                        <Field
                                            type="number"
                                            className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] disabled:text-light-secondary"
                                            name="sequence"
                                            disabled={disabledSequence}
                                        />
                                        <div className="mt-[2px] min-h-[21px]">
                                            <ErrorMessage name="sequence" className="text-status-error" component="span"/>
                                        </div>
                                    </div>
                                </div>
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
                            </div>
                            <Button type="submit" variant="info">SALVAR</Button>
                        </form>
                    )}
                </Formik>
                <p className="text-status-error">{messageError}</p>
            </div>
        </GenericModal>
    );
}
