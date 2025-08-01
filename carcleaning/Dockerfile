# Use Node.js base image with latest LTS and security patches
FROM node:18.20.3-alpine3.19


WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Setting port
EXPOSE 3000

CMD ["npm", "start"]
