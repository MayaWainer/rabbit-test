FROM node:16.14-alpine as build

ARG NPM_TOKEN
ARG SERVICE
ENV service=${SERVICE}
WORKDIR /tmp/
COPY package*.json ./
COPY .npmrc ./

RUN npm install
COPY . .
RUN npm run build

FROM node:16.14-alpine

WORKDIR /app/
COPY --from=build /tmp/node_modules ./node_modules
COPY --from=build /tmp/package*.json ./
COPY --from=build /tmp/dist ./dist

CMD ["sh", "-c", "node dist/apps/$service/main.js"]
