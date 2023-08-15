import Redis from "ioredis";

export function createRedisClient() {
    try {
        const redis = new Redis(`${process.env.REDIS_CONNECTION}`);
        return redis;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const dynamic = "force-dynamic";
