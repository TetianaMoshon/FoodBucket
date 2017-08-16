FROM node:boron-alpine as modules
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --production && npm cache clean --force

FROM node:boron-alpine
WORKDIR /usr/src/app
COPY server.js .
COPY dist/ ./dist
COPY api/ ./api
COPY config/ ./config
COPY --from=modules /usr/src/app .
EXPOSE 3000
CMD [ "node", "server.js" ]
