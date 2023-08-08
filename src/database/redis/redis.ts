import Redis from "ioredis";

export function createRedisClient() {
    try {
        const redis = new Redis( { 
            host: `${process.env.REDIS_HOST}`,
            port: Number(process.env.REDIS_PORT)
        });
        return redis;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
