const db = require('./database-module');
module.exports = app => {

  // Get all product from database products
  app.get('/products', async (request, response) => {
    const data = await db.getProducts();
    response.send(data);
  });

 // Get all product from database basket
 app.get('/basket', async (request, response) => {
  const data = await db.getBasket();
  response.send(data);
});

// Add products to database basket
app.post('/basket/addproducts', async (request, response) => {
  const name = request.query.name;
  const price = parseInt (request.query.price);

  let responseMessage = {
    success: true
  };

  const findBasket = db.findBasket(name, price);
  const findProduct = db.findProduct(name, price);

// Conditions
if (findBasket) {
  const errors = {
    error: 'Error',
    message: 'Product already exist in shopping basket.'
  };
  response.send(errors);
} else if (!findProduct) {
  const errors = {
    error: 'Error',
    message: 'Product not existing in list of products.'
  };
  response.send(errors);
} else {
  // Promise
  const res = db.addProduct(name, price);
  responseMessage.message = 'Product added to shopping basket.'
  response.send(responseMessage);
}
});

// Delete products from database basket
app.delete('/basket/deleteproducts', async (request, response) => {
  const name = request.query.name;
  const price = parseInt (request.query.price);

  let responseMessage = {
    success: true
  };

  const findBasket = db.findBasket(name, price);
  if (!findBasket) {
    const errors = {
      error: 'Error',
      message: 'Product not existing in shopping basket.'
    };
    response.send(errors);
  } else {
    // Promise
    const res = db.removeProduct(name, price);
    responseMessage.message = 'Product deleted from shopping basket.'
    response.send(responseMessage);
  }
});
};