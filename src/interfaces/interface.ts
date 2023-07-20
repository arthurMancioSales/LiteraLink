export interface ApiResponse {
    message: string;
    status: number;
    data: null | object | object[];
    error: null | string;
};

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
};

export interface IUserUpdate {
    name?: string;
    email?: string;
    password?: string;
};

export interface ApiError {
    message: string;
    status: number;
};

export interface IStatistic {
    lastSequence: Date;
    readingTime: number;
    maxSequence: number;
    actualSequence: number;
    goalsAchieved: number;
};
