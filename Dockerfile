FROM node:18-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --loglevel verbose

COPY . ./

RUN npm run build

CMD ["npm", "start"]