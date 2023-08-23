"use client";

import Link from "next/link";
import { generalRequest } from "@/src/functions/generalRequest";
import { useState } from "react";
import { SideImageSign } from "@/src/components/SideImageSign";
import { Button } from "@/src/components/Button";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { Input } from "@/src/components/Input";
import * as Yup from "yup";
import { Logo } from "@/src/components/Logo";
import { Toggle } from "@/src/components/Toggle";

export default function SignInPage() {
    const [messageError, setMessageError] = useState("");
    const [loadingPage, setLoadingPage] = useState(false);

    const navigate = useRouter();

    const validationSchema = Yup.object({
        email: Yup.string().email("Digite um e-mail válido").required("Insira um e-mail válido"),
        password: Yup.string().required("Insira uma senha").matches(/^\S*$/, "A senha não pode conter espaços em branco"),
    });

    const initialValues = {
        email: "",
        password: "",
    };
  
    return (
        <div className="flex w-screen h-screen bg-light-primary dark:bg-dark-primary">
            <div className="flex flex-col w-1/2">
                <div className="flex items-center px-20 py-2 h-[62px] justify-between">
                    <Logo/>
                    <Toggle/>
                </div>
                <div className="flex flex-col justify-center h-full gap-10 px-20">
                    <h2 className="text-3xl font-bold dark:text-dark-text">Entrar</h2>
                    <Formik
                        onSubmit={async (values, {setSubmitting}) => {
                            setLoadingPage(true);

                            const formBody = {
                                email: values.email,
                                password: values.password,                    
                            };
                
                            const response = await generalRequest("/api/login", formBody, "POST");
                            setSubmitting(false);
                            setLoadingPage(false);

                            if(response?.error) {
                                setMessageError(response.error);
                            } else {
                                navigate.replace("/dashboard");
                            }

                        }}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {(props) => (
                            <form className="flex flex-col gap-6" onSubmit={props.handleSubmit} autoComplete="off">
                                <div className="flex flex-col gap-2">
                                    <Input name="email" label="Email" type="email" error={props.errors.email} required/>
                                    <Input name="password" label="Senha" type="password" error={props.errors.password} required/>
                                </div>
                                <div className="w-1/4">
                                    <Button type="submit" variant="brand" isLoading={loadingPage}>ENTRAR</Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                    <div className="flex text-xs dark:text-dark-text">
                        <p>Ainda não possui conta? </p><Link className="underline transition-all duration-150 hover:font-semibold"  rel="stylesheet" href="/sign-up"> Cadastre-se aqui</Link>
                    </div>
                    <p className="text-status-error">{messageError}</p>
                </div>
            </div>
            <SideImageSign src="/images/sign/side-image.png" alt="" />
        </div>
    );
}
