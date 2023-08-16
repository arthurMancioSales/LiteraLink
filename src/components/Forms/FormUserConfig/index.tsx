"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
import { generalRequest } from "@/src/functions/generalRequest";
import { Avatar } from "../../Avatar";

interface PropTypes {
    onClose: () => void;
}

export type OptionsPropsSelect = {
    id: string | number;
    name: string;
}

export function FormUserConfig({ onClose }: PropTypes) {
    const userContext = useContext(UserContext);
    const updateUser = userContext?.updateUser;

    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const [messageError, setMessageError] = useState("");

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
            <div className="flex items-center justify-center">
                <label className="w-[120px]">
                    <input
                        type="file"
                        name="image"
                        hidden
                        onChange={(e) => {
                            if(e.target.files) {
                                const file = e.target.files[0];

                                if(!URL) return;
                            
                                setSelectedImage(URL.createObjectURL(file));
                                setSelectedFile(file); 
                            }
                        }}
                    />
                    <div className="aspect-video w-[120px] h-[120px] rounded-full flex items-center justify-center text-center border-4 border-dashed cursor-pointer">
                        {selectedImage ? (
                            <Avatar src={selectedImage} size={120}/>
                        ): (
                            <span>Insira uma imagem</span>
                        )}
                    </div>
                </label>
            </div>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    const formData = new FormData();
                    formData.set("name", values.userName);
                    formData.set("email", values.userEmail);
                    formData.set("password", values.userPassword);
                    if(selectedFile) {
                        formData.set("image", selectedFile);
                    }
                  
                    const response = await fetch("api/update-user", {
                        method: "PATCH",
                        body: formData,
                        cache: "no-store"
                    });
                    if(!response?.ok) {
                        setMessageError(response.statusText);
                        return;
                    }
                    if(updateUser) {
                        updateUser();
                    }

                    setSubmitting(false);
                    onClose();
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <form className="flex flex-col gap-6" onSubmit={props.handleSubmit} encType="multipart/form-data">
                        <div className="flex flex-col gap-2">
                            <Input name="userName" label="Apelido" error={props.errors.userName} type="text"/>
                            <Input name="userEmail" label="E-mail" error={props.errors.userEmail} type="text"/>
                            <Input name="userPassword" label="Nova senha" error={props.errors.userPassword} type="text"/>
                        </div>
                        <Button type="submit" variant="info">SALVAR</Button>
                    </form>
                )}
            </Formik>
            <p className="text-status-error">{messageError}</p>
        </GenericModal>
    );
}
