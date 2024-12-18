FROM node:22
WORKDIR /app/server
COPY package*.json .
RUN npm install
COPY . /app
EXPOSE 3001
EXPOSE 3002
CMD ["npm", "start"]