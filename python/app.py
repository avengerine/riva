# -*- coding: utf-8 -*-
""" Main controller """
import json
import aioredis
from sanic import Sanic, response
import dependency_injector.containers as containers
import dependency_injector.providers as providers

app = Sanic(__name__)


@app.route("/")
def root_handler(request):
    return response.text("OK")


@app.route("/rivap/<key_id>", methods=['GET'])
async def get_if_exists_handler(request, key_id):
    with await request.app.redis_pool as redis:
        exists = await redis.execute('exists', key_id)
        if exists:
            val = await redis.execute('get', key_id)
            return response.json(json.loads(val.decode('utf-8')), status=200)
    return response.text("Not found", status=404)


@app.route("/rivap/<key_id>", methods=['POST'])
async def set_handle(request, key_id):
    with await request.app.redis_pool as redis:
        await redis.execute('set', key_id, json.dumps(request.json))
    return response.text("Stored!", status=201)


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
