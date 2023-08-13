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
import { Avatar } from "../../Avatar";

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

    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
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
            <div className="flex justify-center items-center">
                <label className="w-[120px]">
                    <input
                        type="file"
                        name="file"
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
                    formData.append("nameCommunity", values.nameCommunity);
                    formData.append("descriptionCommunity", values.descriptionCommunity);

                    if(selectedFile) {
                        formData.append("file", selectedFile);
                    }

                    const response = await generalRequest("/api/community", formData, "POST");

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
                        <div>
                            <Input name="nameCommunity" label="Nome" error={props.errors.nameCommunity} type="number"/>
                            <TextArea name="descriptionCommunity" label="Descrição" type="text"/>
                        </div>
                        <Button type="submit" variant="info">CRIAR</Button>
                    </form>
                )}
            </Formik>
            <p className="text-status-error">{messageError}</p>
        </GenericModal>
    );
}
