FROM node:20-alpine

WORKDIR /tmp/app

# Install dependencies
COPY package.json package-lock.json ./
COPY ./tsconfig.json ./ 
COPY ./src ./src 
COPY ./.env ./ 
RUN npm install 
EXPOSE ${SERVER_PORT} 
 
CMD ["npm", "run", "start"]
