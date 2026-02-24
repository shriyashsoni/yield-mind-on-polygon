import { redis } from "../config/redis.js";
export function createRateLimiter(limit, windowMs) {
    return async (req, res, next) => {
        const key = `ratelimit:${req.ip}:${Math.floor(Date.now() / windowMs)}`;
        const current = await redis.incr(key);
        if (current === 1)
            await redis.pexpire(key, windowMs);
        if (current > limit) {
            return res.status(429).json({ error: "Too many requests" });
        }
        next();
    };
}
