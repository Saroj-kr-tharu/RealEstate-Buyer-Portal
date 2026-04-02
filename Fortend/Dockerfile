FROM node:20-alpine
# from the base image node 

WORKDIR /realestate/fortend
# working directory define 

COPY package*.json ./

RUN npm ci 
#clean install 

COPY . .
#copy all the file for the host to working directory 


CMD [ "npm", "run", "dev" ]
# cmd when container is on 
