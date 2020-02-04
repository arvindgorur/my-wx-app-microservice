FROM node:latest

COPY . /app

RUN cd /app; npm install

EXPOSE 8081

CMD cd /app && node index.js
