# -*- coding: utf-8 -*-
""" Main controller """
from app import app


def test_index_returns_200():
    request, response = app.test_client.get('/')
    assert response.status == 200
