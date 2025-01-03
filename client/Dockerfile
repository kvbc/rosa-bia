FROM node:22 AS build
WORKDIR /client
COPY ./client/package*.json .
RUN npm install
COPY ./client .
COPY ./shared /shared
WORKDIR /shared
RUN npm install
WORKDIR /client
# RUN ls -R /
# EXPOSE 3000
# RUN npm run dev
# RUN npm run dev
# CMD ["npm", "run", "dev"]
RUN npm run build --verbose
# CMD ["npm", "run", "build"]

FROM nginx:alpine AS runner
COPY --from=build /client/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]