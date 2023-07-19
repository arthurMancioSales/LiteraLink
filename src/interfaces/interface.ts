export interface ApiResponse {
    message: string;
    status: number;
    data: null | Object | Object[];
    error: null | string;
};

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