import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      // Rate limit hit
      if (decision.reason.isRateLimit()) {
        console.log(
          `Rate limit hit from IP ${req.ip}: tokens left ${decision.tokensRemaining || 0}`
        );
        return res
          .status(429)
          .json({ message: "Too many requests, please try again later." });
      }

      // Bot detected
      if (decision.reason.isBot()) {
        console.warn(
          `Bot detected from IP ${req.ip}: ${JSON.stringify(
            decision.reason,
            null,
            2
          )}`
        );

        if (process.env.NODE_ENV === "production") {
          return res.status(403).json({ message: "Access denied for bots." });
        }
      }

      // Other denial reasons
      else {
        console.warn("ArcJet denied request:", JSON.stringify(decision.reason));
      }
    }

    next();
  } catch (error) {
    console.error("ArcJet Middleware Error:", error);
    next(error);
  }
};

export default arcjetMiddleware;
