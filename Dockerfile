FROM node:10.15.3-alpine

COPY harmony /app/harmony
COPY issuebot /app/issuebot

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++

RUN cd /app/issuebot/ && npm install
RUN cd /app/harmony && npm link && cd /app/issuebot && npm link discord-harmony

WORKDIR /app/issuebot

RUN npm run build

ENTRYPOINT ["npm"]
CMD ["run", "start-nobuild"]
