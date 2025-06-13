FROM 22.12.0-alpine3.21

WORKDIR /app

RUN apk add --no-cache make gcc g++ python3

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]