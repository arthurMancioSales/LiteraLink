type method = "GET" | "POST" | "PATCH" | "DELETE";

export const statusHTTP = {
    unauthorized: 401,
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

        if (!req.ok) {
            switch (req.status) {
                case 401:
                    return (statusHTTP.unauthorized);
                default:
                    throw new Error("Request failed");
            }
        }

        const response = await req.json();

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
