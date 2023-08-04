import { ApiResponse } from "../interfaces/interface";

export function createResponse(): ApiResponse {
    return {
        message: "Sucess",
        status: 200,
        data: null,
        error: null
    };
}
