const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to TMS',
}));

module.exports = app;
