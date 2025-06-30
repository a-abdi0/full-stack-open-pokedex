FROM node:20 AS builder

WORKDIR /app


COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY app.js ./
COPY src ./src

ENV NODE_ENV production

EXPOSE 8080
CMD ["npm", "run", "start-prod"]