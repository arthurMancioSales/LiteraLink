import { onMessage } from "@/src/service/websocket/websocketController";

const connections = [];

export function SOCKET(
    client: import("ws").WebSocket
) {
    console.log("Nova conexão");

    client.on("message", onMessage);
}
