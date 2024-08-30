#!/bin/sh

yarn install

yarn global add pm2
npm install -g nodemon

echo "Waiting for the database to be ready..."
while ! nc -z $DB_CONNECTION_STRING $DB_PORT; do
  sleep 1
done

yarn migrate

pm2-runtime start ecosystem.config.js