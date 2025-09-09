FROM node:22 as client-build
WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm install
COPY client/ .
RUN npm run build

FROM node:22 as server-build
WORKDIR /app/server
COPY server/package.json server/package-lock.json* ./
RUN npm install
COPY server/ .
# Run migrations and seeders
RUN npx sequelize-cli --config ./db/config/config.json --migrations-path ./db/migrations db:migrate
RUN npx sequelize-cli --config ./db/config/config.json --seeders-path ./db/seeders db:seed:all

# Final image
FROM node:22
WORKDIR /app
# Copy built client
COPY --from=client-build /app/client/dist ./dist
# Copy server code
COPY --from=server-build /app/server ./server
WORKDIR /app/server
EXPOSE 3000
CMD ["npm", "start"]