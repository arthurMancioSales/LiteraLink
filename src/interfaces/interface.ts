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
    communities: IUserCommunity[];
    books: IBook[];
    statistics: IStatistic;
}

export interface ICommunityUser {
    id: number;
    name: string;
    image: string;
}

export interface INewUser {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    image?: string;
    communities?: IUserCommunity[];
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
    _id: string;
    name: string;
    description: string;
    favoriteBook?: string;
    image: string;
    is_admin: number;
    members: ICommunityUser[];
}
export interface IUserCommunity {
    id: number | string;
    name: string;
}

export interface ICreateCommunity {
    id?: ObjectId;
    name: string;
    description: string;
    favoriteBook: string;
    image?: string;
    is_admin: string;
    members?: [] | IUserCommunity[];
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
    id: string | number;
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
    id: string;
    status?: "lido" | "lendo" | "ler";
    chaptersRead?: number;
    favorite?: boolean;
    lastSequence?: Date;
    goals?: IGoals[];
    goalExpire?: Date;
    goalsAchieved?: number;
}

export interface IPatchBookRepo {
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


export interface IPatchCommunity{
    id?: string;
    oldName: string;
    name?: string;
    description?: string;
    favoriteBook?: string;
    image?: string;
    is_admin?: ObjectId | string;
    members?: [] | Array<{id: string | ObjectId, name: string}>;
}

export interface IFormatedResquestCommunity {
    name?: string;
    description?: string;
    favoriteBook?: string;
    image?: string;
    is_admin?: ObjectId | string;
    members?: [] | Array<{id: string | ObjectId, name: string}>;
}
