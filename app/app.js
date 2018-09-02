const express = require('express');
const app = express();


module.exports = (di) => {
    const rivaCtrl = require('./controllers/riva')(di);

    app.get('/', rivaCtrl.healthcheck);
    app.get('/riva/:key', rivaCtrl.getKey);
    app.post('/riva/:key', rivaCtrl.setKey);

    return app;
}

