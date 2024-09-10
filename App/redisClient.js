require("dotenv").config();
const { Redis } = require("@upstash/redis");

// Create a Redis client using the Upstash credentials
const redisClient = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

async function connectRedis() {
  try {
    // Check if Redis is connected by performing a simple operation
    await redisClient.set("test-key", "test-value");
    console.log("Connected to Upstash Redis and performed a test operation.");
  } catch (err) {
    console.error("Error connecting to Upstash Redis", err);
  }
}

connectRedis();

module.exports = redisClient;
