FROM node:22.14.0-alpine3.21 AS builder

WORKDIR /app

ENV TZ=Asia/Jakarta

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

FROM node:22.14.0-alpine3.21

WORKDIR /app

ENV TZ=Asia/Jakarta

COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "start"]
