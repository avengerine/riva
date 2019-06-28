FROM node:10

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install --production

COPY . .

HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1

EXPOSE 3000
CMD ["npm", "start"]