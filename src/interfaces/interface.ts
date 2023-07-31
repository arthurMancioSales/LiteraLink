import { ObjectId } from "mongodb";

export interface ApiResponse {
    message: string;
    status: number;
    data: null | object | object[];
    error: null | string;
}

export interface IUser {
    id: ObjectId | string;
    name: string;
    email: string;
    password: string;
    image?: string;
    communities: ICommunity[];
    books: IBook[];
    statistics: IStatistic;
}

export interface INewUser {
    id?: number | string | ObjectId;
    name: string;
    email: string;
    password: string;
    image?: string;
    communities?: ICommunity[];
    books?: IBook[];
    statistics?: IStatistic;
}

export interface IUserUpdate {
    name?: string;
    email?: string;
    password?: string;
}

export interface ApiError {
    message: string;
    status: number;
}

export interface ICommunity {
    id: number;
    name: string;
}

export interface IStatistic {
    lastSequence: Date;
    booksRead: number;
    readingTime: number;
    maxSequence: number;
    actualSequence: number;
    goalsAchieved: number;
}

export interface IBook {
    id: string | number | ObjectId;
    title: string;
    image: string;
    status: "lido" | "lendo" | "ler";
    totalChapter: number;
    chaptersRead?: number;
    favorite?: boolean;
    lastSequence?: Date;
    goalExpire: Date;
    goals?: IGoals[];
    goalsAchieved: number;
}

export interface IPatchBook {
    id: string | number;
    status?: "lido" | "lendo" | "ler";
    chaptersRead?: number;
    favorite?: boolean;
    lastSequence?: Date;
    goals?: IGoals[];
    goalExpire?: Date;
    goalsAchieved?: number;
}

export interface IGoals {
    type: "days" | "time" | "pages";
    partial: number;
    total: number;
}

export interface IQuery {
    type: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    text: string,
    value: Object
}