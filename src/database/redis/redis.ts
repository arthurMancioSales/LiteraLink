import Redis from "ioredis";

export function createRedisClient() {
    console.log(process.env.REDIS_HOST) 
    try {
        const redis = new Redis(`${process.env.REDIS_CONNECTION}`);
        return redis;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
