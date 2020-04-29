const express = require('express');
const app = express();
const database = require('./modules/database-module');
const endpoints = require('./modules/api-endpoints');
const port = process.env.PORT || 7000;

endpoints(app);

app.use(express.static("public"));

app.listen(port, () => {
  console.log('Server running on port: ', port);
  database.dbInit();
});