"use client";

import Link from "next/link";
import { generalRequest } from "@/src/functions/generalRequest";
import { useState } from "react";
import { SideImageSign } from "@/src/components/SideImageSign";
import { Button } from "@/src/components/Button";
import { useRouter } from "next/navigation";
import { Logo } from "@/src/components/Logo";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/src/components/Input";
import { Toggle } from "@/src/components/Toggle";

export default function SignUpPage() {
    const [messageError, setMessageError] = useState("");
    const [loadingPage, setLoadingPage] = useState(false);

    const navigate = useRouter();

    const validationSchema = Yup.object({
        userName: Yup.string().required("Insira um apelido").matches(/^[a-zA-Z0-9 ]*$/, "O apelido não pode conter caracteres especiais"),
        email: Yup.string().email("Digite um e-mail válido").required("Insira um e-mail válido"),
        password: Yup.string().required("Insira uma senha"),
        verifyPassword: Yup.string().required("Confirmação de senha é obrigatória").oneOf([Yup.ref("password")], "As senhas devem coincidir"),
    });

    const initialValues = {
        userName: "",
        email: "",
        password: "",
        verifyPassword: "",
    };

    return(
        <div className="flex w-screen h-screen bg-light-primary dark:bg-dark-primary">
            <div className="flex flex-col w-1/2">
                <div className="flex justify-between items-center px-20 py-2 h-[62px]">
                    <Logo/>
                    <Toggle/>
                </div>
                <div className="flex flex-col justify-center h-full gap-4 px-20">
                    <h2 className="text-3xl font-bold dark:text-dark-text">Criar conta</h2>
                    <Formik
                        onSubmit={async (values, {setSubmitting}) => {
                            setLoadingPage(true);
                            const formBody = {
                                name: values.userName,
                                email: values.email,
                                password: values.password,                    
                            };
                
                            const response = await generalRequest("/api/new-user", formBody, "POST");
                        
                            setLoadingPage(false);
                            setSubmitting(false);

                            if(response?.error) {
                                setMessageError(response.error);
                            } else {
                                navigate.replace("/sign-in");
                            }

                        }}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {(props) => (
                            <form className="flex flex-col gap-6" onSubmit={props.handleSubmit} autoComplete="off">
                                <div className="flex flex-col">
                                    <Input name="userName" label="Apelido" type="text" error={props.errors.userName} required/>
                                    <Input name="email" label="Email" type="email" error={props.errors.email} required/>
                                    <Input name="password" label="Senha" type="password" error={props.errors.password} required />
                                    <Input name="verifyPassword" label="Confirmar a senha" type="password" error={props.errors.verifyPassword} required />
                                </div>
                                <Button type="submit" variant="info" isLoading={loadingPage}>CADASTRAR</Button>
                            </form>
                        )}
                    </Formik>
                    <div className="flex text-xs dark:text-dark-text">
                        <p>Já possui conta? </p><Link className="underline transition-all duration-150 hover:font-semibold"  rel="stylesheet" href="/sign-in"> Entre aqui</Link>
                    </div>
                    <p className="text-status-error">{messageError}</p>
                </div>
            </div>
            <SideImageSign src="/images/signup/signup.png" alt="" />
        </div>
    );
}
