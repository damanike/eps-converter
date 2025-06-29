FROM node:18

RUN apt update && apt install -y imagemagick ghostscript

WORKDIR /app

COPY . .

RUN npm install

EXPOSE $PORT


CMD ["node", "server.js"]
