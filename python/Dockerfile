FROM python:3.6

WORKDIR /app/
COPY Pipfile /app/

RUN pipenv install \
    && pipenv shell

ADD ./app/ /app/