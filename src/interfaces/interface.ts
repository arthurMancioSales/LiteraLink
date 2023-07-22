export interface ApiResponse {
    message: string;
    status: number;
    data: null | object | object[];
    error: null | string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
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

export interface IStatistic {
    lastSequence: Date;
    readingTime: number;
    maxSequence: number;
    actualSequence: number;
    goalsAchieved: number;
}

export interface IBook {
    id: string | number;
    status?: "lido" | "lendo" | "ler";
    chaptersRead?: number;
    favorite?: boolean;
    lastSequence?: Date;
    goals?: IGoals[];
}

export interface IGoals {
    type: "days" | "time" | "pages";
    partial: number;
    total: number;
}
