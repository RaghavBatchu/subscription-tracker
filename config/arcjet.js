import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  rules: [
    // Shield: always LIVE
    shield({ mode: "LIVE" }),

    // Bot detection: log only in dev, block in prod
    detectBot({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    // Token bucket: smaller bucket in dev for easy testing
    tokenBucket({
      mode: "LIVE",
      capacity: process.env.NODE_ENV === "production" ? 100 : 3, // 3 tokens for testing
      refillRate: 1,
      interval: 10,
    }),
  ],
});

export default aj;
