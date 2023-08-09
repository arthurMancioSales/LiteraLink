"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../../Modal/GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { Select } from "../../Select";
// import { generalRequest } from "@/src/functions/generalRequest";

interface PropTypes {
    onClose: () => void;
}

const books = [
    {
        id: 1,
        name: "dfsdfs"
    },
    {
        id: 2,
        name: "dfsdfs"
    },
    {
        id: 3,
        name: "dfsdfs"
    },
];
  
export function FormProgress({ onClose }: PropTypes) {
    const validationSchema = Yup.object({
        bookName: Yup.string().required("É necessário escolher um livro"),
        readingChapters: Yup.number().max(100, "O máximo são 100 capítulos").min(0, "Não existe capítulos negativos").required("Digite o número de capítulos lidos"),
        pagesRead: Yup.number().max(1000, "O máximo são 1000 páginas").min(0, "Não existe páginas negativas"),
        readingTime: Yup.number().max(1440, "O Tempo de leitura ultrapassa 1440 minutos").min(0, "Não existe tempo negativo")
    });

    const initialValues = {
        bookName: "",
        readingChapters: "",
        pagesRead: 0,
        readingTime: 0
    };
  
    return (
        <GenericModal title="Progresso de leitura" onClose={onClose}>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    console.log(values);
                    // const formBody = {
                        
                    // };
                    // await generalRequest("/api/book-list", formBody, "PATCH");
                    setSubmitting(false);
                    onClose();
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <form className="flex flex-col gap-6" onSubmit={props.handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Select name="bookName" label="Livro" array={books} error={props.errors.bookName} required/>
                            <Input name="readingChapters" label="Capítulos lidos" type="number" error={props.errors.readingChapters} required/>
                            <Input name="pagesRead" label="Páginas lidas" error={props.errors.pagesRead} type="number"/>
                            <Input name="readingTime" label="Tempo de leitura" error={props.errors.readingTime} type="number"/>
                        </div>
                        <Button type="submit" variant="info">SALVAR</Button>
                    </form>
                )}
            </Formik>
        </GenericModal>
    );
}
