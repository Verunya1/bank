FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview" ]