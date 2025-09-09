# BOOK A TICKET

[technical raport](https://github.com/Ech0n/Book-a-ticket/blob/main/docs/raport-techniczny.md)
[documentation](https://github.com/Ech0n/Book-a-ticket/blob/main/docs/dokumentacja-biznesowa.md)

## How to run production server:
`docker compose up`  
server should be running on localhost:3000

## How to run development server:

1. Clone the repo
2. `npm run install-all` - Install libraries
3. `npm run dev`

## Db managment:

1. Migrate tables:  
`cd server`  
`npx sequelize-cli --config ./db/config/config.json --migrations-path ./db/migrations db:migrate`  

2. Seed table contents for development purposes:  
`cd server`  
`npx sequelize-cli --config ./db/config/config.json --seeders-path ./db/seeders db:seed:all`  
