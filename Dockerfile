FROM node:alpine

RUN apk update
RUN apk upgrade
RUN apk add git

ENV WORKING_DIR="/usr/app"
ENV PORT=4001

WORKDIR ${WORKING_DIR}

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE ${PORT}

CMD ["nodemon", "server/server.js"]
