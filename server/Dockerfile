FROM node:22
WORKDIR /server
COPY ./server/*.json .
ENV NODE_ENV=production
RUN npm install
COPY ./server .
COPY ./shared /shared
WORKDIR /shared
RUN npm install
WORKDIR /server
RUN npm run build
RUN npm install -g pm2
# EXPOSE 3001
# EXPOSE 3002
# RUN npm start
# RUN npm run dev
CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]
