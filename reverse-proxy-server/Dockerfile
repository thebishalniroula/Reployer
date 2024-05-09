FROM node:latest

RUN apt-get update

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "main.js"]