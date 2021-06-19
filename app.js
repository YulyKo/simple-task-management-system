const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const app = express();

app.use(cors({
  origin: '*',
}));
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sequelize);

require('./src/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to TMS',
}));

module.exports = app;
