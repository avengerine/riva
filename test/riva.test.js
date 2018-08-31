const request = require('supertest');
const td = require('testdouble');

const di = require('./container.setup');
const redisClient = require('../app/redis-client');

di.factory('redisClient', (container) => {
    let fakeRedis = td.object(['getAsync', 'setAsync']);
    td.when(fakeRedis.getAsync('foundkey')).thenReturn('{"key": "value"}');
    td.when(fakeRedis.getAsync('unknown')).thenReturn('null');
    td.when(fakeRedis.setAsync()).thenReturn(undefined);
    return fakeRedis;
});
const app = require('../app/app')(di);


describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("OK");
        expect(response.body).toEqual({});
    });
});

describe('Test key found path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/riva/foundkey');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({"key":"value"});
    });
});

describe('Test key NOT found path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/riva/unknown');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(null);
    });
});

describe('Test key value store path with success', () => {
    test('It should response POST with 201 status code', async () => {
        const response = await request(app).post('/riva/store?name=value&status=ok');
        expect(response.statusCode).toBe(201);
        expect(response.text).toEqual("Stored!");
    });
});