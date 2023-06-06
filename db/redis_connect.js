const Redis = require('redis');
const read_secret = require('../server/secret_reader');
const REDIS_PW = read_secret('redis_pw');

const redisClient = Redis.createClient({
    legacyMode: true,
    socket: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
    },
    password: REDIS_PW
});

async function connectRedis() {
    try {
        await redisClient.connect();
        console.log("REDIS CONNECTION SUCCESSFUL");
    } catch (err) {
        console.log(`REDIS CONNECTION FAILED: ${err}`);
    }
}

async function disconnectRedis() {
    try {
        redisClient.disconnect();
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connectRedis, disconnectRedis, redisClient };
