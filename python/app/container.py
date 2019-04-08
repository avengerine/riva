# -*- coding: utf-8 -*-
""" Main Container """
import aioredis
from dependency_injector import containers, providers


class RedisPool:

    def __init__(self, config, aioredis):
        self.config = config
        self.aioredis = aioredis

    async def create(self, loop):
        return await self.aioredis.create_pool(
            (self.config.get('redis_host'), self.config.get('redis_port')),
            minsize=self.config.get('redis_min_size'),
            maxsize=self.config.get('redis_max_size'),
            loop=loop
        )


class Configs(containers.DeclarativeContainer):
    config = providers.Configuration('config')


class Clients(containers.DeclarativeContainer):
    redis = providers.Factory(RedisPool, Configs.config, aioredis)
