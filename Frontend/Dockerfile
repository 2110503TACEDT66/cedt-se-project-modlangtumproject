FROM node:slim as base

# RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json .
EXPOSE 3000


FROM base as production
WORKDIR /app
ENV NODE_ENV=production
COPY . .
RUN npm ci
RUN npm run build
CMD ["npm", "start"]  


FROM base as dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD ["npm", "run", "dev"]
