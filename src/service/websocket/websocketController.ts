export function onMessage(message: string | Buffer) {
    console.log(JSON.parse(message.toString()));
}
