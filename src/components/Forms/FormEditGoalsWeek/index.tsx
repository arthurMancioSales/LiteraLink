"use client";

import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";
import { Input } from "../../Input";

interface PropTypes {
    onClose: () => void;
    bookId: string | number;
}

export type OptionsPropsSelect = {
    id: string | number;
    name: string;
}

// type IGoalsType = "days" | "time" | "chapters";

export function FormAddGoalsWeek({ onClose, bookId }: PropTypes) {
    const userContext = useContext(UserContext);
    const updateUser = userContext?.updateUser;

    const [messageError, setMessageError] = useState("");

    const validationSchema = Yup.object({
        totalGoal: Yup.number().min(0, "Você não pode inserir números negativos"),
    });

    const initialValues = {
        totalGoal: 0
    };
  
    return (
        <GenericModal title="Adição de metas semanais" onClose={onClose}>
            <div className="flex flex-col gap-2">
                <Formik 
                    onSubmit={async (values, {setSubmitting}) => {
                        const formBody = {
                            bookId: bookId,
                            totalGoals: values.totalGoal,                       
                        };

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
                                <Input label="Teste" name="totalGoal" type="text" required/>
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
