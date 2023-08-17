"use client";

import { ErrorMessage, Field, Formik } from "formik";
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
        communityGenre: ""
    };
  
    return (
        <GenericModal title="Adicionar comunidade" onClose={onClose}>
            <div className="flex items-center justify-center">
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
                        required
                    />
                    <div className="aspect-video w-[120px] h-[120px] rounded-full flex items-center justify-center text-center border-4 border-dashed cursor-pointer">
                        {selectedImage ? (
                            <Avatar src={selectedImage} size={120}/>
                        ): (
                            <span className="text-lg">Enviar imagem</span>
                        )}
                    </div>
                </label>
            </div>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    const formData = new FormData();
                    formData.append("name", values.nameCommunity);
                    formData.append("description", values.descriptionCommunity);
                    formData.append("communityGenre", values.communityGenre);

                    if(selectedFile) {
                        formData.append("image", selectedFile);
                    }

                    const req = await fetch("/api/community", {
                        method: "POST",
                        body: formData,
                        cache: "no-store"
                    });
            
                    const response = await req.json();

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
                            <Input name="nameCommunity" label="Nome" error={props.errors.nameCommunity} type="text" required/>
                            <div className="flex gap-2">
                                <label  className="dark:text-dark-text" htmlFor="communityGenre">
                                    Gênero favorito
                                </label>
                                <label className="text-status-error">*</label>
                            </div>
                            <Field as="select" className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark- mb-[23px] text"  name="communityGenre">
                                <option selected disabled value="" hidden>Selecione uma opção</option>
                                <option value="ficcao">Ficção</option>
                                <option value="fantasia">Fantasia</option>
                                <option value="terror">Terror</option>
                                <option value="romance">Romance</option>
                                <option value="drama">Drama</option>
                                <option value="aventura">Aventura</option>
                                <option value="historico">Histórico</option>
                                <option value="biografia">Biografia</option>
                                <option value="autoajuda">Autoajuda</option>
                                <option value="poesia">Poesia</option>
                            </Field>
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
