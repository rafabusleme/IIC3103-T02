# IIC3103-T02 - Rafael Abusleme

A REST API developed for "Taller de integración" Course

https://integrify-api.herokuapp.com/

## Build Setup

### Prerequisites

- Node.js Version >= v12 - (https://nodejs.org/)
- Yarn - (https://classic.yarnpkg.com/en/docs/install)
- PostgreSQL (https://www.postgresql.org/download/)

### Config environment

Create a .env file to set app environment variables. (Look at .env.example)

### How to run the app locally

```bash
# install dependencies
$ yarn install

# create database
$ yarn sequelize db:create

# run migrations
$ yarn sequelize db:migrate

# serve with hot reload
$ yarn dev
```

### How to deploy the app

```bash
# login heroku
$ heroku login

# deploy to heroku
$ git push heroku master

# run migrations
$ heroku run sequelize db:migrate
```
