const request = require('supertest');
const td = require('testdouble');

const di = require('./container.setup');
const redisClient = require('../app/redis-client');

di.factory('redisClient', (container) => {
    let fakeRedis = td.object(['getAsync']);
    td.when(fakeRedis.getAsync('foundkey')).thenReturn('{"key": "value"}');
    td.when(fakeRedis.getAsync('unknown')).thenReturn('null');
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