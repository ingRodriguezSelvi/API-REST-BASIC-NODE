FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENV MONGO_URL=mongodb+srv://user_node_api:wb9rzxdtOakHorIg@cluster0.fxuzx7x.mongodb.net/cafedb

CMD ["npm", "start"]