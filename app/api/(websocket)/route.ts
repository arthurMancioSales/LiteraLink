import { onMessage } from "@/src/service/websocket/websocketController";

const connections = [];

export function SOCKET(
    client: import("ws").WebSocket,
    request: import("http").IncomingMessage,
    server: import('ws').WebSocketServer
) {
    console.log("Nova conexão");
    console.log(request.url);
    // handleNewConnection(client, request. ) 

    client.on("message", onMessage);
}

// function handleNewConnection(connection: WebSocket, source: string) {

// }
