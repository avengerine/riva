const express = require('express');
const app = express();
const redisClient = require('./redis-client')


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/riva/:key', async (req, res) => {
	const { key } = req.params;
	const rawData = await redisClient.getAsync(key);
	return res.json(JSON.parse(rawData));
});

app.post('/riva/:key', async (req, res) => {
    const { key } = req.params;
    const value = req.query;
    await redisClient.setAsync(key, JSON.stringify(value));
    return res.send('Stored!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

	console.log('Example app listening on port ${PORT}!');
});