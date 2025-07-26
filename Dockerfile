FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "development" ]

# Dockerfile for Gizmos Backend
# This Dockerfile sets up the environment for the Gizmos backend application.