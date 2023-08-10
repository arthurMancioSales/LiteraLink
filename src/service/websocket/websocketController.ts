import { IWebsocketConnections, IWsGenericMessage, IWsSendMessage } from "@/src/interfaces/interface";
import { RawData, WebSocket } from "ws";

const connections: IWebsocketConnections[] = [];

export function onMessage(data: string | Buffer | RawData, client: WebSocket) {
    const message: IWsGenericMessage = JSON.parse(data.toString());

    switch (message.type) {
        case "enter":
            // eslint-disable-next-line no-case-declarations
            const newConnection: IWebsocketConnections = {
                client: client,
                room: message.params.room,
                profilePicture: message.params.profilePicture,
                username: message.params.username
            };
            connections.push(newConnection);
            break;
        case "message":
            handleMessage(message, client);
            break;
    }

    console.log(connections);
}


export function onClose(ws: WebSocket) {
    const index = connections.findIndex((connection) => connection.client == ws);
    
    console.log("antes de sair", connections);
    if (index !== -1) {
        connections.splice(index, 1);
    }
    console.log("depois de sair", connections);
}

function handleMessage(message: IWsGenericMessage, client: WebSocket) {
    const actualConnection = connections.filter((connection) => connection.client == client);
    
    const roomToSendMessage = connections.filter((connection) => (connection.room == actualConnection[0].room) && connection.client != client);

    const returnMessage: IWsSendMessage = {
        type: "message",
        params: {
            message: message.params.message,
            username: actualConnection[0].username,
            profilePicture: actualConnection[0].profilePicture,
            variant: "reciever"
        }
    };

    roomToSendMessage.forEach((connection) => {
        connection.client.send(JSON.stringify(returnMessage));
    });
}
