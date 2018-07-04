FROM node:9-alpine as builder

MAINTAINER Jim Wright <jmwri@gmail.com>

ADD package.json /tmp/package.json

RUN cd /tmp && \
    npm install && \
    mkdir -p /app && \
    cp -a /tmp/node_modules /app

WORKDIR /app

ADD . /app

RUN npm run build && \
    rm -rf ./build ./test ./src

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
