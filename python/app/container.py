# -*- coding: utf-8 -*-
""" Main Container """
import aioredis
from dependency_injector import containers, providers


class Configs(containers.DeclarativeContainer):
    config = providers.Configuration('config')


class RedisPool:

    def __init__(self, config):
        self.config = config

    async def create(self, loop):
        return await aioredis.create_pool(
            (self.config.get('redis_host'), self.config.get('redis_port')),
            minsize=self.config.get('redis_min_size'),
            maxsize=self.config.get('redis_max_size'),
            loop=loop
        )


class Clients(containers.DeclarativeContainer):
    redis = providers.Factory(RedisPool, Configs.config)