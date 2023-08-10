import { onClose, onMessage } from "@/src/service/websocket/websocketController";
import WebSocket from "ws";

export function SOCKET(
    client: WebSocket
) {
    console.log("Nova conexão");

    client.on("message", (data) => {
        onMessage(data, client);
    });

    client.on("close", () => {
        onClose(client);
    });
}
