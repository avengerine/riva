const express = require('express');
const app = express();


module.exports = (di) => {
    app.get('/', (req, res) => {
        res.status(200).send('OK');
    });

    app.get('/riva/:key', async (req, res) => {
        const { key } = req.params;
        const found = await di.container.redisClient.keysAsync(key);
        if (!found.length)
            return res.status(404).send('Not found');
        const rawData = await di.container.redisClient.getAsync(key);
        console.log('Found ' + JSON.stringify(rawData, null, 2));
        return res.json(JSON.parse(rawData));
    });

    app.post('/riva/:key', async (req, res) => {
        const { key } = req.params;
        const value = req.query;
        console.log('Value to store ' + JSON.stringify(value, null, 2));
        let result = await di.container.redisClient.setAsync(key, JSON.stringify(value));
        if (result == 'OK')
            return res.status(201).send('Stored!');
        return res.status(500).send('Error!');
    });

    return app;
}
