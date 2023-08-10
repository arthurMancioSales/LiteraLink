import { IFormatedResquestCommunity, IPatchBook, IPatchBookRepo } from "../interfaces/interface";

export function CommunityFormattedRequest (request: any) {
    const formattedBody: IFormatedResquestCommunity = {};
    if ("name" in request) {
        formattedBody.name = request.name;
    }
    if ("description" in request) {
        formattedBody.description = request.description;
    }
    if ("favoriteBook" in request) {
        formattedBody.favoriteBook = request.favoriteBook;
    }
    if ("image" in request) {
        formattedBody.image = request.image;
    }

    if ("is_admin" in request) {
        formattedBody.is_admin = request.is_admin;
    }
    if ("members" in request) {
        formattedBody.members = request.members;
    }
    return formattedBody;
}

export function bookFormattedRequest(requestBody: IPatchBook) {
    const body: IPatchBook = {
        id: requestBody.id,
    };
    if ("status" in requestBody) {
        body.status = requestBody.status;
    }
    if ("pagesRead" in requestBody) {
        body.pagesRead = requestBody.pagesRead;
    }
    if ("favorite" in requestBody) {
        body.favorite = requestBody.favorite;
    }
    if ("lastSequence" in requestBody) {
        body.lastSequence = requestBody.lastSequence;
    }
    if ("goals" in requestBody) {
        body.goals = requestBody.goals;
    }
    if ("goalExpire" in requestBody) {
        body.goalExpire = requestBody.goalExpire;
    }
    if ("goalsAchieved" in requestBody) {
        body.goalsAchieved = requestBody.goalsAchieved;
    }
    return body;
}

export function bookFormattedRequestRepo(requestBody: IPatchBook) {
    const body: IPatchBookRepo = {};
    if ("status" in requestBody) {
        body.status = requestBody.status;
    }
    if ("pagesRead" in requestBody) {
        body.pagesRead = requestBody.pagesRead;
    }
    if ("favorite" in requestBody) {
        body.favorite = requestBody.favorite;
    }
    if ("lastSequence" in requestBody) {
        body.lastSequence = requestBody.lastSequence;
    }
    if ("goals" in requestBody) {
        body.goals = requestBody.goals;
    }
    if ("goalExpire" in requestBody) {
        body.goalExpire = requestBody.goalExpire;
    }
    if ("goalsAchieved" in requestBody) {
        body.goalsAchieved = requestBody.goalsAchieved;
    }
    return body;
}
