FROM 22.12.0-alpine

WORKDIR /app

RUN apk add --no-cache make gcc g++ python3

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 8001
ENTRYPOINT ["./entrypoint.sh"]

