FROM node:16-alpine

WORKDIR /

COPY /package*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]

#docker build -t profile-be .
#docker run -d -p 8001:8001 -d profile-be