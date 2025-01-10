FROM node:22

WORKDIR /root/express-api-grocery/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
