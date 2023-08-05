"use client"
import Link from "next/link";
import { generalRequest } from "@/src/functions/generalRequest";
import { useState } from "react";
import { ImagemLateral } from "@/src/components/imagemLateral";
import { Button } from "@/src/components/Button";
import { useRouter } from 'next/navigation'
export default function SignPage() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [emailConfirmed, setEmailConfirmed] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmed, setPasswordConfirmed] = useState("")

    const navigate = useRouter()

    const requestNewUser = async (e: React.MouseEvent) => {
        e.preventDefault()
        const parametros = {
            name,
            email,
            password
        }
        if (password == passwordConfirmed && email == emailConfirmed ) {
            await generalRequest("/api/new-user", parametros, "POST")
            navigate.replace('/dashboard')

        }else (alert("Email e Senha diferentes"))
    }

    return (
        <div className="flex w-full h-full bg-light-primary">
            <div className="flex w-1/2 h-screen justify-center content-center flex-col space-x-3.5 px-3.5 py-3.5 rounded-lg bg-primaryLight dark:bg-secondaryDar">
                <h2 className="text-center text-2xl">Criar Conta</h2>
                <form action="">
                    <div className="sm:col-span-4">

                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Nome
                        </label>
                        <div className="mt-2">
                            <input
                                id="Nome"
                                name="Nome"
                                type="name"
                                autoComplete="Nome"
                                onChange={(e) => setName(e.target.value)}

                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="emailConfirmed"
                                name="emailConfirmed"
                                type="email"
                                autoComplete="emailConfirmed"
                                onChange={(e) => setEmailConfirmed(e.target.value)}

                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>


                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Senha
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                onChange={(e) => setPassword(e.target.value)}

                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Senha
                        </label>
                        <div className="mt-2">
                            <input
                                id="passwordConfirmed"
                                name="passwordConfirmed"
                                type="password"
                                autoComplete="passwordConfirmed"
                                onChange={(e) => setPasswordConfirmed(e.target.value)}

                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-x-6">
                        <Button
                            onClick={(e) => requestNewUser(e)}

                        >
                            Entrar
                        </Button>
                    </div>
                </form>
                <div className="flex m-4 text-xs">
                    <p>Já possui uma conta? </p><Link className="underline" rel="stylesheet" href="/sign-in"> Entre aqui</Link>
                </div>
            </div>
            <ImagemLateral src="/images/image.jpg" alt=""></ImagemLateral>
        </div>
    );
}
