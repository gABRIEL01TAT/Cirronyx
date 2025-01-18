import { createClient } from 'redis';
const client = createClient();

client.on('error', (err) => {
    console.error('Redis error: ', err);
});

const setCache = (key, value) => {
    client.setEx(key, 3600, JSON.stringify(value)); // Cache for 1 hour
};

const getCache = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) reject(err);
            resolve(data ? JSON.parse(data) : null);
        });
    });
};

export default { setCache, getCache };