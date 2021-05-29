const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const fsp = require('fs').promises;
const {pool} = require('./config')
const router = require('./router');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use('/tasks', router);

async function boot() {
    const seedsSQL = (
      await fsp.readFile(
        path.join(process.cwd(), 'scripts', 'init.sql')
      )
    ).toString();
  await pool.query(seedsSQL);
  app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
  })
}

// Start server
boot();
