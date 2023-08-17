import { ObjectId } from "mongodb";
import { StaticImageData } from "next/image";
import { WebSocket } from "ws";

export interface ApiResponse {
    message: string;
    status: number;
    data: null | object | object[];
    error: null | string;
}

export interface IUser {
    _id: ObjectId | string;
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
    image?: string;
}

export interface ApiError {
    message: string;
    status: number;
}

export interface ICommunity {
    _id: string;
    name: string;
    description: string;
    communityGenre: string;
    image: string;
    is_admin: string;
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
    communityGenre: string;
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
    totalPages: number;
    pagesRead?: number;
    favorite?: boolean;
    lastSequence?: Date;
    goalExpire: Date;
    goals?: IGoals[];
    goalsAchieved: number;
}

export interface IPatchBook {
    id: string;
    status?: "lido" | "lendo" | "ler";
    pagesRead?: number;
    favorite?: boolean;
    lastSequence?: Date;
    goals?: IGoals[];
    goalExpire?: Date;
    goalsAchieved?: number;
}

export interface IPatchBookRepo {
    status?: "lido" | "lendo" | "ler";
    pagesRead?: number;
    favorite?: boolean;
    lastSequence?: Date;
    goals?: IGoals[];
    goalExpire?: Date;
    goalsAchieved?: number;
}

export type IGoalsType = "days" | "time" | "chapters";

export interface IGoals {
    type: IGoalsType;
    partial: number;
    total: number;
    createDate: Date;
    lastVisitDate: Date;
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

export interface IUploadBody {
    [paramName: string]: string;
}

// Websocket Interfaces
export interface IWebsocketConnections {
    client: WebSocket;
    room: string;
    username: string;
    profilePicture: string;
    userId: string | ObjectId;
}

export interface IWsGenericMessage {
    type: "enter" | "message",
    params: {
        [paramName: string]: string;
    }
}

export interface IWsEnterMessage {
    type: "enter",
    params: {
        room: string;
        username: string,
        profilePicture: string | StaticImageData,
    }
}

export interface IWsSendMessage {
    type: "message",
    params: {
        userId: string | ObjectId,
        username: string,
        profilePicture: string | StaticImageData,
        message: string,
        variant: "sender" | "reciever"
    }
}

export interface IChatContent {
    userId: string | ObjectId,
    username: string,
    profilePicture: string | StaticImageData,
    message: string,
    variant: "sender" | "reciever"
}
