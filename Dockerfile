FROM 18-alpine3.14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]