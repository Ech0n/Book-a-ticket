FROM node:22
WORKDIR /app
COPY . .
RUN npm run install-all
RUN cd server && npx sequelize-cli --config ./db/config/config.json --migrations-path ./db/migrations db:migrate
RUN cd server && npx sequelize-cli --config ./db/config/config.json --seeders-path ./db/seeders db:seed:all
EXPOSE 5173
CMD ["npm", "run", "dev"]