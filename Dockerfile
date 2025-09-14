FROM node:22 as client-build
WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm ci
ENV NODE_ENV=production
COPY client/ ./
RUN npm run build

FROM node:22 as server-build
ENV NODE_ENV=production
WORKDIR /app/server
COPY server/package.json server/package-lock.json* ./
RUN npm ci
COPY server/ .
RUN npx sequelize-cli --config ./db/config/config.json --migrations-path ./db/migrations db:migrate --env production
RUN npx sequelize-cli --config ./db/config/config.json --seeders-path ./db/seeders db:seed:all --env production

FROM node:22
ENV NODE_ENV=production
WORKDIR /app
COPY --from=client-build /app/client/dist ./dist
COPY --from=server-build /app/server ./server
WORKDIR /app/server
EXPOSE 3000
CMD ["npm", "start"]