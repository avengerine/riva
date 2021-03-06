const request = require('supertest')
const app = require('./setup')

describe('Test unknown path', () => {
  test('It should not response the GET method', async () => {
    const response = await request(app).get('/unknown')
    expect(response.statusCode).toBe(404)
  })
})

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.text).toEqual('OK')
    expect(response.body).toEqual({})
  })
})

describe('Test key found path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/riva/foundkey')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ 'key': 'value' })
  })
})

describe('Test key NOT found path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/riva/unknown')
    expect(response.statusCode).toBe(404)
    expect(response.text).toEqual('Not found')
  })
})

describe('Test key value store path with success', () => {
  test('It should response POST with 201 status code', async () => {
    const response = await request(app).post('/riva/storevalue?name=value')
    expect(response.statusCode).toBe(201)
    expect(response.text).toEqual('Stored!')
  })
})

describe('Test key value store path with error', () => {
  test('It should response POST with 500 status code', async () => {
    const response = await request(app).post('/riva/error?wrong=value')
    expect(response.statusCode).toBe(500)
    expect(response.text).toEqual('Error!')
  })
})
