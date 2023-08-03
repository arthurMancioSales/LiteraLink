"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { GenericModal } from "../GenericModal";
import { Input } from "../../Input";
import { Button } from "../../Button";

interface PropTypes {
    isOpen: boolean;
  }
  
export function FormProgress({ isOpen }: PropTypes) {

    const validationSchema = Yup.object({
        bookName: Yup.string(),
        readingChapters: Yup.number().max(100, "Ops! São muitos capítulos lidos").min(0, "Não existe capítulos negativos").required("Digite o número de capítulos lidos"),
        pagesRead: Yup.number().max(1000, "Ops! São muitas páginas lidas").min(0, "Não existe páginas negativos"),
        readingTime: Yup.number().max(1440, "Ops! Tempo de leitura muito longo").min(0, "Não existe tempo negativo")
    });

    const initialValues = {
        bookName: "",
        readingChapters: 0,
        pagesRead: 0,
        readingTime: 0
    };
  
    return (
        <GenericModal title="Progresso de leitura" isOpen={isOpen}>
            <Formik 
                onSubmit={(values, {setSubmitting}) => {
                    console.log(values);
                    setSubmitting(false);
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <form className="flex flex-col gap-6" onSubmit={props.handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Input name="bookName" label="Livro" type="text" required/>
                            <Input name="readingChapters" label="Capítulos lidos" type="number" required/>
                            <Input name="pagesRead" label="Páginas lidas" type="number"/>
                            <Input name="readingTime" label="Tempo de leitura" type="number" required/>
                        </div>
                        <Button type="submit">SALVAR</Button>
                    </form>
                )}
            </Formik>
        </GenericModal>
    );
}
