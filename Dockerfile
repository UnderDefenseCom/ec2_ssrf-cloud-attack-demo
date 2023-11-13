FROM node:18.18.1 as build
WORKDIR /usr/src/app
COPY . .
RUN npm i && npm run build:release


FROM node:18.18.1-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY --from=build /usr/src/app/build/ ./build/
CMD ["npm", "run", "start"]
EXPOSE 3000
