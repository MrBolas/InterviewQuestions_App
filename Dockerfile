FROM node:18-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --loglevel verbose

COPY . ./

CMD ["npm", "start"]