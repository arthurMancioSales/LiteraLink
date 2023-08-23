"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";
import { Input } from "../../Input";
import { IGoals } from "@/src/interfaces/interface";

interface PropTypes {
    onClose: () => void;
    bookId: string | number;
    goal: IGoals;
}

export type OptionsPropsSelect = {
    id: string | number;
    name: string;
}

export function FormEditGoals({ bookId, goal, onClose }: PropTypes) {
    const userContext = useContext(UserContext);
    const updateUser = userContext?.updateUser;
    const [loading, setLoading] = useState(false);
    
    const [messageError, setMessageError] = useState("");

    const validationSchema = Yup.object({
        readingTime: Yup.number().min(1, "O valor total deve ser maior que zero")
    });

    const initialValues = {
        readingTime: goal.total
    };
  
    return (
        <GenericModal title="Edição de metas do livro" onClose={onClose}>
            <div className="flex flex-col gap-2">
                <Formik 
                    onSubmit={async (values, {setSubmitting}) => {
                        const goals = [];
                        
                        goals.push({
                            type: goal.type,
                            total: values.readingTime
                        });

                        const formBody = {
                            id: bookId,
                            goals                     
                        };
                        setLoading(true);
                        const response = await generalRequest("/api/book-goals", formBody, "PATCH");
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
                            <div className="flex flex-col gap-2">
                                <Input name="readingTime" 
                                    label="Tempo de leitura total (minutos)" 
                                    type="number" 
                                    error={props.errors.readingTime}
                                    haveTooltip
                                    tooltipText="Tempo mínimo que você gostaria de ler"
                                />
                            </div>
                            <div className="flex w-full">
                                <div className="w-1/4 mx-auto">
                                    <Button onClick={onClose} variant="error" isLoading={loading}>Cancelar</Button>
                                </div>
                                <div className="w-1/4 mx-auto">
                                    <Button type="submit" variant="success" isLoading={loading}>Salvar</Button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
                <p className="text-status-error">{messageError}</p>
            </div>
        </GenericModal>
    );
}
