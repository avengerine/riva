const express = require('express');
const app = express();
const di = require('./container.js');

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.get('/riva/:key', async (req, res) => {
    const { key } = req.params;
    const rawData = await di.container.redisClient.getAsync(key);
    return res.json(JSON.parse(rawData));
});

app.post('/riva/:key', async (req, res) => {
    const { key } = req.params;
    const value = req.query;
    await di.container.redisClient.setAsync(key, JSON.stringify(value));
    return res.status(201).send('Stored!');
});

app.listen(di.container.config.app.port, () => {
    console.log('Listening on port ' + di.container.config.app.port);
});
