/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to BD');
  })
  .catch((err) => {
    console.log('Fail connected to BD');
    console.log(err.message);
  });

const app = express();

app.use(bodyParser.json());
console.log('Отработал парсер')
app.use(routes);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
