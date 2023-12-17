# Futteboxd

App inspired by Letterboxd for football matches

## How to use

### Setup variables

Create a `.env` file and fill the environment variables

```
COMPOSE_PROJECT_NAME=futteboxd
JWT_SECRET=
PORT_API=3000

DB_HOST=db
DB_PORT=5432
DB_DATABASE=futteboxd
DB_EXTERNAL_PORT=5432
DB_USER=
DB_PASSWORD=
DB_SYNCHRONIZE=true
```

This project utilizes NestJS and PostgreSQL and is written in TypeScript. To run, I recommend Docker to create the postgres DB and start the project. In order to get developing, please run the following things in your terminal:

```bash
# install & run
npm install
docker-compose up
```

## Populate Database

To populate database, start the API, then go to the `scripts` folder and run all the scripts.

This data was collected from [API-Football](api-football.com)

```bash
cd scripts

node countries.js
node leagues.js
node teams.js
node fixtures.js
```
