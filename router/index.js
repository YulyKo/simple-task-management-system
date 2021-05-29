const express = require('express');
const router = express.Router();
// const modules = require('./modules');
const { getBooks } = require('../modules/index')

router.get('/', getBooks)
  // POST endpoint
  // .post('/', modules.addBook())

module.exports = router;
