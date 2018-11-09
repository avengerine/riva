FROM python:3.6

WORKDIR /var/www/app
COPY Pipfile ./

RUN pip install pipenv

RUN pipenv install

COPY . .

EXPOSE 8000
CMD ["pipenv", "run", "python", "app.py", "--no-interactive"]