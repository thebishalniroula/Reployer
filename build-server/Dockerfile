FROM node

RUN apt-get update
RUN apt-get install curl
RUN apt-get install git

WORKDIR /home/app/

COPY package*.json .
RUN npm install

COPY . .

RUN chmod +x /home/app/script.sh
RUN chmod +x /home/app/main.js

ENTRYPOINT [ "/home/app/script.sh" ]