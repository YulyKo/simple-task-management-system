const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const log = require('./utils/logger')(__filename);
const config = require('./config');
const routers = require('./routes/index');
const cors = require('cors');

require('express-async-errors');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan(config.NODE_ENV === 'production' ? 'tiny' : 'development'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routers);

app.use((req, res, next) => {
  next(createError(404, `Page Not Found ${req.path}`));
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res) => {
  res.status(error.status || 500);
  const errMessage = { status: error.status, message: error.message };
  if (config.NODE_ENV === 'development') {
    errMessage.stack = error.stack;
  }
  res.send({ errMessage });
});

log.info('Application is ready for usage');

module.exports = app;
