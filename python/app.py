# -*- coding: utf-8 -*-
""" Main controller """
import os
import asyncio
import uvloop
import aioredis
import logging
from datetime import datetime
import sanic
from sanic import Sanic, response
from sanic.response import json
import dependency_injector.containers as containers
import dependency_injector.providers as providers


asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
app = Sanic(__name__)
loop = asyncio.get_event_loop()


@app.route("/")
async def handle_root(request):
    return response.json({"ptua": "zorra"})


@app.route("/test")
async def handle(request):
    with await request.app.redis_pool as redis:
        await redis.execute('set', 'test-my-key', 'value')
        val = await redis.execute('get', 'test-my-key')
    return response.text(val.decode('utf-8'))


@app.route("/pong")
async def handle(request):
    with await request.app.redis_pool as redis:
        await redis.execute('set', 'test-my-key', 'value')
        val = await redis.execute('get', 'test-my-key')
    return response.text(val.decode('utf-8'))


@app.listener('before_server_start')
async def before_server_start(app, loop):
    app.redis_pool = await aioredis.create_pool(
        ('localhost', 6379),
        minsize=1,
        maxsize=1,
        loop=loop
    )


@app.listener('after_server_stop')
async def after_server_stop(app, loop):
    app.redis_pool.close()
    await app.redis_pool.wait_closed()


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
