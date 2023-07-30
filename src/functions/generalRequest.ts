type method = "GET" | "POST" | "PATCH" | "DELETE";

export async function generalRequest(url: string, body?: object, method: method = "GET") {
    const req = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        cache: "no-store"
    });

    const response = await req.json();

    return response.data;
}
