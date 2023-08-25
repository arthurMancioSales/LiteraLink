"use client";

import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(authenticated)/layout";
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
    const [loading, setLoading] = useState(false);

    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const [messageError, setMessageError] = useState("");

    const validationSchema = Yup.object({
        nameCommunity: Yup.string().required("É necessário um nome para comunidade"),
        communityGenre: Yup.string().required("É necessário escolher um gênero"),
        descriptionCommunity: Yup.string().required("É necessário inserir uma descrição").max(500, "Tamanho limite atingido"),
    });

    const initialValues = {
        nameCommunity: "",
        descriptionCommunity: "",
        communityGenre: ""
    };
  
    return (
        <GenericModal title="Adicionar comunidade" onClose={onClose} styleSize={{height: "fit-content"}}>
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
                    formData.append("userImage", userContext?.userData?.image as string);

                    if(selectedFile) {
                        formData.append("image", selectedFile);
                    }
                    setLoading(true);
                    const req = await fetch("/api/community", {
                        method: "POST",
                        body: formData,
                        cache: "no-store"
                    });
                    setLoading(false);
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
                            <Field as="select" className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark-text"  name="communityGenre" id="communityGenre">
                                <option value="" disabled selected hidden>Selecione uma opção</option>
                                <option value="Ficção">Ficção</option>
                                <option value="Fantasia">Fantasia</option>
                                <option value="Terror">Terror</option>
                                <option value="Romance">Romance</option>
                                <option value="Drama">Drama</option>
                                <option value="Aventura">Aventura</option>
                                <option value="Histórico">Histórico</option>
                                <option value="Biografia">Biografia</option>
                                <option value="Autoajuda">Autoajuda</option>
                                <option value="Poesia">Poesia</option>
                            </Field>
                            <div className="mt-[2px] min-h-[21px]">
                                <ErrorMessage name="communityGenre" className="text-status-error" component="span"/>
                            </div>
                            <TextArea name="descriptionCommunity" label="Descrição" type="text" required />
                        </div>
                        <div className="flex w-full">
                            <div className="w-1/4 mx-auto">
                                <Button onClick={onClose} variant="error" isLoading={loading}>Cancelar</Button>
                            </div>
                            <div className="w-1/4 mx-auto">
                                <Button type="submit" variant="success" isLoading={loading}>Criar</Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            <p className="text-status-error">{messageError}</p>
        </GenericModal>
    );
}
