"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { useContext } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";

interface PropTypes {
    onClose: () => void;
}

export type OptionsPropsSelect = {
    id: string | number;
    name: string;
}

export function FormProgress({ onClose }: PropTypes) {
    const userContext = useContext(UserContext);
    const updateUser = userContext?.updateUser;

    const validationSchema = Yup.object({
        userName: Yup.string(),
        userEmail: Yup.string(),
        userPassword: Yup.string(),
    });

    const initialValues = {
        userName: "",
        userEmail: "",
        userPassword: "",
    };
  
    return (
        <GenericModal title="Configurações do usuário" onClose={onClose}>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    console.log(values);
                    
                    const formBody = {
                        name: values.userName,
                        email: values.userEmail,
                        password: values.userPassword,                        
                    };

                    await generalRequest("/api/update-user", formBody, "PATCH");

                    if (updateUser) {
                        updateUser();
                    }

                    setSubmitting(false);
                    onClose();
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <form className="flex flex-col gap-6" onSubmit={props.handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Input name="userName" label="Apelido" error={props.errors.userName} type="number"/>
                            <Input name="userEmail" label="E-mail" error={props.errors.userEmail} type="number"/>
                            <Input name="userPassword" label="Nova senha" error={props.errors.userPassword} type="number"/>
                        </div>
                        <Button type="submit" variant="info">SALVAR</Button>
                    </form>
                )}
            </Formik>
        </GenericModal>
    );
}
