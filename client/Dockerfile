FROM node:22 AS build
WORKDIR /app/client
COPY package*.json .
RUN npm install
COPY . /app
# RUN ls -R /app
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]