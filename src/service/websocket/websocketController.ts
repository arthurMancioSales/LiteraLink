import { IChatContent, IWebsocketConnections, IWsGenericMessage, IWsSendMessage } from "@/src/interfaces/interface";
import { getChatMessages } from "@/src/repository/websocket/getChatMessages";
import { postChatMessage } from "@/src/repository/websocket/postMessage";
import { auth } from "@/src/utils/middlewares/auth";
import { IncomingMessage } from "http";
import { RawData, WebSocket } from "ws";

const connections: IWebsocketConnections[] = [];

export async function onMessage(data: string | Buffer | RawData, client: WebSocket, request: IncomingMessage) {
    const message: IWsGenericMessage = JSON.parse(data.toString());
    const user = await auth(request);
    switch (message.type) {
        case "enter":
            // eslint-disable-next-line no-case-declarations
            const newConnection: IWebsocketConnections = {
                client: client,
                room: message.params.room,
                profilePicture: message.params.profilePicture,
                username: message.params.username,
                userId: user.id,
            };
            connections.push(newConnection);

            updateChat(client, newConnection);

            break;
        case "message":
            handleMessage(message, client);
            break;
    }

}


export function onClose(ws: WebSocket) {
    const index = connections.findIndex((connection) => connection.client == ws);
    
    if (index !== -1) {
        connections.splice(index, 1);
    }
}

function handleMessage(message: IWsGenericMessage, client: WebSocket) {
    const actualConnection = connections.filter((connection) => connection.client == client);
    
    const roomToSendMessage = connections.filter((connection) => (connection.room == actualConnection[0].room) && connection.client != client);
    const params: IChatContent = {
        userId: actualConnection[0].userId,
        message: message.params.message,
        username: actualConnection[0].username,
        profilePicture: actualConnection[0].profilePicture,
        variant: "reciever"
    };
    
    const returnMessage: IWsSendMessage = {
        type: "message",
        params: params
    };

    postChatMessage(params, actualConnection[0]);

    roomToSendMessage.forEach((connection) => {
        connection.client.send(JSON.stringify(returnMessage));
    });
}

export async function updateChat(client: WebSocket, connection: IWebsocketConnections) {
    const community = await getChatMessages(connection.room);

    if (community?.chat) {
        community.chat.forEach((message: IChatContent) => {
            const returnMessage: IWsSendMessage = {
                type: "message",
                params: message
            };
            
            if (connection.userId !== message.userId) {
                returnMessage.params.variant = "reciever";
                client.send(JSON.stringify(returnMessage));
                return;
            }
    
            returnMessage.params.variant = "sender";
            client.send(JSON.stringify(returnMessage));
            return;
        });
    }
}
