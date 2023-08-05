"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { Select } from "../../Select";
// import { generalRequest } from "@/src/functions/generalRequest";

interface PropTypes {
    isOpen: boolean;
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
  
export function FormAddBook({ isOpen }: PropTypes) {

    const validationSchema = Yup.object({
        bookName: Yup.string().required("É necessário escolher um livro"),
        sequence: Yup.number().max(100, "Ops! Este número é muito grande").min(0, "Não existe sequências negativas").required("Digite o número de capítulos lidos"),
        pages: Yup.number().max(1000, "Ops! São muitas páginas lidas").min(0, "Não existe páginas negativos"),
        chapters: Yup.number().max(1000, "Ops! São muitos capítulos").min(0, "Não existe capítulos negativos"),
        readingTime: Yup.number().max(1440, "Ops! Tempo de leitura muito longo").min(0, "Não existe tempo negativo")
    });

    const initialValues = {
        bookName: "",
        sequence: 0,
        pages: 0,
        chapters: 0,
        readingTime: 0
    };
  
    return (
        <GenericModal title="Progresso de leitura" isOpen={isOpen}>
            <Formik 
                onSubmit={async (values, {setSubmitting}) => {
                    console.log(values);
                    // await generalRequest("/api/book-list", formBody, "PATCH");
                    setSubmitting(false);
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <form className="flex flex-col gap-6" onSubmit={props.handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Select name="bookName" label="Livro" array={books} required/>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold">Metas semanais</span>
                                <Input name="pages" label="Quantidade de páginas" type="number" required/>
                                <Input name="chapters" label="Quantidade de capítulos" type="number" required/>
                                <Input name="sequence" label="Sequência" type="number"/>
                                <Input name="readingTime" label="Tempo de leitura" type="number"/>
                            </div>
                        </div>
                        <Button type="submit" variant="info">SALVAR</Button>
                    </form>
                )}
            </Formik>
        </GenericModal>
    );
}
