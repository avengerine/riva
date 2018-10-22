# -*- coding: utf-8 -*-
""" Main controller """
from sanic import Sanic
from sanic.response import json

import aiohttp

app = Sanic(__name__)


@app.route('/')
async def test(request):
    return json({'hello': 'world'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
