const express = require('express');
const database = require('./model/database-module');
const port = process.env.PORT || 7000;

database.dbInit()

const productsRouter = require('./controller/route-products');
const basketRouter = require('./controller/route-basket');

const app = express();

app.use(express.static("view"));

app.use('/api/products', productsRouter);
app.use('/api/basket', basketRouter);

app.listen(port, () => {
  console.log('Server running on port:', port);
});