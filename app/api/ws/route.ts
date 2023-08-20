import { onClose, onMessage } from "@/src/service/websocket/websocketController";
import { IncomingMessage } from "http";
import WebSocket from "ws";

export function SOCKET(
    client: WebSocket,
    request: IncomingMessage
) {
    console.log("/api/ws - cliente");
    console.log(client);
    console.log("/api/ws - req");
    console.log(request);
    
    client.on("message", (data) => {
        onMessage(data, client, request);
    });

    client.on("close", () => {
        onClose(client);
    });
}
