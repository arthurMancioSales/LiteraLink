import { IBook, IPatchBook, IUser } from "@/src/interfaces/interface";
import { ObjectId } from "mongodb";

export const userMocked = {
    _id: new ObjectId('614c55a72a0a16a3b1e3d0e5'),
    name: "edu",
    email: "edu@gmail.com",
    password: "senha123",
    image: 'imageUserDefault',
    communities: [
        {
            id: 1,
            name: "Comunidade 1",
        },
        {
            id: 3,
            name: "edu world",
        }
    ],
    books: [
        {
            id: 1,
            title: "As Tranças do Rei careca",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalPages: 15,
            pagesRead: 15,
            favorite: true,
            lastSequence: new Date("12/12/2012"),
            goalExpire: new Date("01/01/2021"),
            goalsAchieved: 5,
            goals: [
                {
                    type: "days",
                    partial: 15,
                    total: 15,
                },
                {
                    type: "chapters",
                    partial: 395,
                    total: 445,
                },
                {
                    type: "time",
                    partial: 15,
                    total: 60,
                },
            ],
        },
        {
            id: 2,
            title: "Poeira em Baixo Mar",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalPages: 12,
            pagesRead: 9,
            favorite: false,
            lastSequence: new Date("12/12/2022"),
            goalExpire: new Date("12/12/2023"),
            goals: [
                {
                    type: "days",
                    partial: 395,
                    total: 445,
                },
            ],
            goalsAchieved: 0
        },
        {
            id: 4,
            title: "Poeira no Mar",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalPages: 12,
            pagesRead: 9,
            favorite: false,
            lastSequence: new Date("12/12/2022"),
            goalExpire: new Date("12/12/2023"),
            goals: [
                {
                    type: "days",
                    partial: 395,
                    total: 445,
                },
            ],
            goalsAchieved: 0
        },
        {
            id: 3,
            title: "Poeiras Cósmicas",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalPages: 12,
            pagesRead: 9,
            favorite: false,
            lastSequence: new Date("12/12/2022"),
            goalExpire: new Date("12/12/2023"),
            goals: [
                {
                    type: "days",
                    partial: 395,
                    total: 445,
                },
            ],
            goalsAchieved: 0
        },
    ],
    statistics: {
        lastSequence: new Date("09/07/2023"),
        booksRead: 15,
        readingTime: 241,
        maxSequence: 3,
        actualSequence: 1,
        goalsAchieved: 5,
    },
};

export const userMocked2: IUser = {
    _id: '614c55a72a0a16a3b1e3d0e5',
    name: "edu",
    email: "edu@gmail.com",
    password: "senha123",
    image: 'imageUserDefault',
    communities: [
        {
            id: 1,
            name: "Comunidade 1",
        },
        {
            id: 3,
            name: "edu world",
        }
    ],
    books: [
        {
            id: 1,
            title: "As Tranças do Rei careca",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalPages: 15,
            pagesRead: 15,
            favorite: true,
            lastSequence: new Date("12/12/2012"),
            goalExpire: new Date("01/01/2021"),
            goalsAchieved: 5,
            goals: [
                {
                    type: "days",
                    partial: 15,
                    total: 15,
                },
                {
                    type: "chapters",
                    partial: 395,
                    total: 445,
                },
                {
                    type: "time",
                    partial: 15,
                    total: 60,
                },
            ],
        },
        {
            id: 2,
            title: "Poeira em Baixo Mar",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalPages: 12,
            pagesRead: 9,
            favorite: false,
            lastSequence: new Date("12/12/2022"),
            goalExpire: new Date("12/12/2023"),
            goals: [
                {
                    type: "days",
                    partial: 395,
                    total: 445,
                },
            ],
            goalsAchieved: 0
        },
        {
            id: 4,
            title: "Poeira no Mar",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalPages: 12,
            pagesRead: 9,
            favorite: false,
            lastSequence: new Date("12/12/2022"),
            goalExpire: new Date("12/12/2023"),
            goals: [
                {
                    type: "days",
                    partial: 395,
                    total: 445,
                },
            ],
            goalsAchieved: 0
        },
        {
            id: 3,
            title: "Poeiras Cósmicas",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalPages: 12,
            pagesRead: 9,
            favorite: false,
            lastSequence: new Date("12/12/2022"),
            goalExpire: new Date("12/12/2023"),
            goals: [
                {
                    type: "days",
                    partial: 395,
                    total: 445,
                },
            ],
            goalsAchieved: 0
        },
    ],
    statistics: {
        lastSequence: new Date("09/07/2023"),
        booksRead: 15,
        readingTime: 241,
        maxSequence: 3,
        actualSequence: 1,
        goalsAchieved: 5,
    },
};

export const bookMocked: IBook = {
    id: "4",
    title: "Poeira no Mar",
    image:
    "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
    status: "ler",
    totalPages: 12,
    pagesRead: 9,
    favorite: false,
    lastSequence: new Date,
    goalExpire: new Date,
    goals: [
        {
            type: "days",
            partial: 395,
            total: 445,
        },
    ],
    goalsAchieved: 0
};

export const updateBook: IPatchBook = {
    id: "4",
    status: "ler",
    pagesRead: 9,
    favorite: false,
    lastSequence: new Date,
    goalExpire: new Date,
    goals: [
        {
            type: "days",
            partial: 395,
            total: 445,
        },
    ],
    goalsAchieved: 0
};
