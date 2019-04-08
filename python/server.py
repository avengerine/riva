# -*- coding: utf-8 -*-
""" Main controller """
from app.app import app
from app.container import Configs


if __name__ == '__main__':
    Configs.config.override({
        "redis_host": "localhost",
        "redis_port": 6379,
        "redis_min_size": 1,
        "redis_max_size": 1
    })
    app.run(host="0.0.0.0", port=8000)
