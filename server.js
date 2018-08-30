const di = require('./container');
const app = require('./app')(di);

app.listen(di.container.config.app.port, () => {
    console.log('Listening on port ' + di.container.config.app.port);
});
