type method = "GET" | "POST" | "PATCH" | "DELETE";

export const statusErrorHTTP = {
    badRequest: "",
    unauthorized: "Não autorizado!",
    notFound: "Usuário não cadastrado!",
    internalServerError: "Erro no servidor!"
};

export async function generalRequest(url: string, body?: object, method: method = "GET") {
    try {
        const req = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            cache: "no-store"
        });

        const response = await req.json();

        if (!req.ok) {
            return response;
        }

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
