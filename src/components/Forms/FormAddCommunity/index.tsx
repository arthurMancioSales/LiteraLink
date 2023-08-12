"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";
import { TextArea } from "../../TextArea";

interface PropTypes {
    onClose: () => void;
}

export type OptionsPropsSelect = {
    id: string | number;
    name: string;
}

export function FormAddCommunity({ onClose }: PropTypes) {
    const userContext = useContext(UserContext);
    const updateUser = userContext?.updateUser;

    const [messageError, setMessageError] = useState("");

    const validationSchema = Yup.object({
        nameCommunity: Yup.string().required("É necessário um nome para comunidade"),
        descriptionCommunity: Yup.string(),
    });

    const initialValues = {
        nameCommunity: "",
        descriptionCommunity: "",
    };
  
    return (
        <GenericModal title="Adicionar uma comunidade" onClose={onClose}>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    console.log(values);
                    
                    const formBody = {
                        name: values.nameCommunity,
                        description: values.descriptionCommunity,          
                    };

                    const response = await generalRequest("/api/community", formBody, "POST");

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
                        <Input name="nameCommunity" label="Nome" error={props.errors.nameCommunity} type="number"/>
                        <TextArea name="descriptionCommunity" label="Descrição" type="text"/>
                        <Button type="submit" variant="info">CRIAR</Button>
                    </form>
                )}
            </Formik>
            <p className="text-status-error">{messageError}</p>
        </GenericModal>
    );
}
