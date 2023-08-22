import { IFormatedResquestCommunity, IGoals, IGoalsType, IPatchBook, IPatchBookRepo } from "../interfaces/interface";
import { dateNow } from "./dateCorrect";
import { GoalTypeValidator } from "./validators/validator";

export function CommunityFormattedRequest (request: any) {
    const formattedBody: IFormatedResquestCommunity = {};
    if ("name" in request) {
        formattedBody.name = request.name;
    }
    if ("description" in request) {
        formattedBody.description = request.description;
    }
    if ("communityGenre" in request) {
        formattedBody.communityGenre = request.communityGenre;
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
    if ("goalExpire" in requestBody) {
        body.goalExpire = requestBody.goalExpire;
    }
    return body;
}

export function goalFormattedResquest(
    goals: Array<{
        type: IGoalsType, 
        total: number,
        parcial?:number,
        createDate?: Date
    }>
) {
    const requestBody:IGoals[] = [];
    goals.forEach(element => {
        if (element.type === "days") {
            new GoalTypeValidator(element.type);
            const formattedResquestBody: IGoals = {
                type: element.type,
                total: 7,
                partial: 0,
                createDate: dateNow(),
                lastVisitDate: dateNow()
            };
            requestBody.push(formattedResquestBody);
            return;
        }
        new GoalTypeValidator(element.type);
        const formattedResquestBody: IGoals = {
            type: element.type,
            total: element.total,
            partial: 0,
            createDate: dateNow(),
            lastVisitDate: dateNow()
        };
        requestBody.push(formattedResquestBody);
    });
    return requestBody;
}

export function goalDeleteFormattedResquest(
    goals: Array<{
        type: IGoalsType
    }>
) {
    const requestBody:{type: IGoalsType}[] = [];
    goals.forEach(element => {
        new GoalTypeValidator(element.type);
        const formattedResquestBody: any = {
            type: element.type
        };
        requestBody.push(formattedResquestBody);
    });
    return requestBody;
}
