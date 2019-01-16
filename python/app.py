# -*- coding: utf-8 -*-
""" Main controller """
import json
import aioredis
from sanic import Sanic, response
from dependency_injector import containers, providers

app = Sanic(__name__)


class Configs(containers.DeclarativeContainer):
    config = providers.Configuration('config')


class RedisPool:
    @classmethod
    async def create(classmethod, loop):
        return await aioredis.create_pool(
            ('localhost', 6379),
            minsize=1,
            maxsize=1,
            loop=loop
        )


class Clients(containers.DeclarativeContainer):
    redis = providers.Factory(RedisPool)


def root_handler(request):
    return response.text("OK")


async def get_if_exists_handler(request, key_id):
    """
    Get given key, not found if not exists
    """
    with await request.app.redis_pool as redis:
        exists = await redis.execute('exists', key_id)
        if exists:
            val = await redis.execute('get', key_id)
            return response.json(json.loads(val.decode('utf-8')), status=200)
    return response.text("Not found", status=404)


async def set_handle(request, key_id):
    """
    Set content for given key, overwrites if exists
    """
    with await request.app.redis_pool as redis:
        await redis.execute('set', key_id, json.dumps(request.json))
    return response.text("Stored!", status=201)


async def before_server_start(app, loop):
    """
    listener for server start
    """
    app.redis_pool = await RedisPool.create(loop)


async def after_server_stop(app, loop):
    """
    listener for server stop
    """
    app.redis_pool.close()
    await app.redis_pool.wait_closed()


app.register_listener(before_server_start, 'before_server_start')
app.register_listener(after_server_stop, 'after_server_stop')

app.add_route(root_handler, "/")
app.add_route(get_if_exists_handler, "/rivap/<key_id>", methods=['GET'])
app.add_route(set_handle, "/rivap/<key_id>", methods=['POST'])

if __name__ == '__main__':
    Configs.config.override({
        "redis_host": "localhost",
        "redis_port": 6379,
        "redis_min_size": 1,
        "redis_max_size": 1
    })
    app.run(host="0.0.0.0", port=8000)
