import Link from "next/link";
import { Button, VariantButton } from "../Button";
import { ImagemLateral } from "../imagemLateral";

export function CardCadastro() {
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>


                        <label htmlFor="Senha" className="block text-sm font-medium leading-6 text-gray-900">
                            Senha
                        </label>
                        <div className="mt-2">
                            <input
                                id="Senha"
                                name="Senha"
                                type="password"
                                autoComplete="Senha"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <label htmlFor="Senha" className="block text-sm font-medium leading-6 text-gray-900">
                            Senha
                        </label>
                        <div className="mt-2">
                            <input
                                id="Senha"
                                name="Senha"
                                type="password"
                                autoComplete="Senha"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-x-6">
                        <Button
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
