export function userFormattedResponse(responseDB: any){
    const response = {
        name: responseDB.name,
        email: responseDB.email,
        image: responseDB.image,
        communities: responseDB.communities,
        books: responseDB.books,
        statistics: responseDB.statistics 
    };
    return response;
}

export function communityFormattedResponse (response: any) {
    const formattedBody = {
        name: response.name,
        description: response.description,
        favoriteBook: response.favoriteBook,
        image: response.image,
        is_admin: response.is_admin,
        members: response.members
    };
    return formattedBody;
}
