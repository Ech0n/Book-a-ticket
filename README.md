# BOOK A TICKET

## How to run:

1. Clone the repo
2. `npm run install-all` - Install libraries
3. `npm run dev`

## Db managment:

1. Migrate tables:  
`cd server`  
`npx sequelize-cli --config ./db/config/config.json --migrations-path ./db/migrations db:migrate`  

2. Seed table contents for development purposes:  
`cd server`  
`npx sequelize-cli --config ./db/config/config.json db:seed:all`  
