FROM node:latest

# Create app directory
WORKDIR /usr/src/app

#copy package files to app directory
COPY package*.json ./

#install dependencies
RUN npm install

#copy code into container
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]