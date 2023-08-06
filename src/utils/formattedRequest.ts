import { IFormatedResquestCommunity } from "../interfaces/interface";

export function CommunityFormattedRequest (request: any) {
    const formattedBody: IFormatedResquestCommunity = {};
    if (request.name) {
        formattedBody.name = request.name;
    }
    if (request.description) {
        formattedBody.description = request.description;
    }
    if (request.favoriteBook) {
        formattedBody.favoriteBook = request.favoriteBook;
    }
    if (request.image) {
        formattedBody.image = request.image;
    }

    if (request.is_admin) {
        formattedBody.is_admin = request.is_admin;
    }
    if (request.members) {
        formattedBody.members = request.members;
    }
    return formattedBody;
}