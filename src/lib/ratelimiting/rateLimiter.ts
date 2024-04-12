import { redis } from "./redis"; // Assuming this imports your Upstash Redis connection
import { Ratelimit } from "@upstash/ratelimit";

export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(2, "60 s"), // Allow 2 requests per minute (60 seconds)
  analytics: false, // Disable analytics (optional)
  timeout: 10000 // Set timeout to 10 seconds (optional)
});

export type RateLimitConfig = {
  windowSize: number;
  windowDuration: number;
  windowUnit: "s" | "m" | "h" | "d";
}


export function createRateLimiter<Type>(config: RateLimitConfig): Type | any {
  return new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(config.windowSize, `${config.windowDuration} ${config.windowUnit}`),
    analytics: false,
    timeout: 10000
  });
}