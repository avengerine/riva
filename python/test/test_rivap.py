# -*- coding: utf-8 -*-
""" Main controller """
import pytest
import mockaioredis
from dependency_injector import providers

from asynctest import MagicMock
from app.app import app
from app.container import Configs, Clients, RedisPool


Configs.config.override({
    "redis_host": "localhost",
    "redis_port": 6379,
    "redis_min_size": 1,
    "redis_max_size": 1
})
Clients.redis = providers.Factory(RedisPool, Configs.config, mockaioredis)


class AsyncContextManagerMock(MagicMock):
    async def __aenter__(self):
        return self.aenter

    async def __aexit__(self, *args, **kwargs):
        pass


def test_index_returns_200():
    """ Root test """
    _, response = app.test_client.get('/')
    assert response.status == 200


async def test_get_existing_key_200():
    """ Redis implied test """
    _, response = await app.test_client.get('/rivap/onfire')
    assert response.status == 200
