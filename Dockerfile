FROM node:alpine

RUN apk update
RUN apk upgrade
RUN apk add git

ENV WORKING_DIR="/usr/app"
ENV PORT=4001

WORKDIR ${WORKING_DIR}

COPY . .

EXPOSE ${PORT}

CMD ["/bin/sh"]
