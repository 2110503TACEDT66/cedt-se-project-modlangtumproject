FROM node:18-alpine

WORKDIR /app

COPY package*.json /app
RUN cd /app && npm install --production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
