const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const fs = require('fs');
const path = require('path');

const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((file) => {
  const routePath = path.join(routesPath, file);
  const route = require(routePath);
  if (typeof route === 'function') {
    app.use('/', route);
  }
});


const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
  });
};

server();
