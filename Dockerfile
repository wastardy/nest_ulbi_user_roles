FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY dist/ dist/

CMD ["npm", "run", "start:dev"]