const db = require('../model/database-module');
const { Router } = require("express");

const router = new Router();

// Add products to database basket
router.post('/addproducts', async (request, response) => {
    const name = request.query.name;
    const price = parseInt (request.query.price);
  
    let responseMessage = {
      success: true
    };
  
    const findBasket = db.findBasketProduct(name, price);
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
  
  router.get('/', async (request, response) => {
    const data = await db.getBasket();
    response.send(data);
  });

  // Delete products from database basket
  router.delete('/basket/deleteproducts', async (request, response) => {
    const name = request.query.name;
    const price = parseInt (request.query.price);
  
    let responseMessage = {
      success: true
    };
  
    const findBasket = db.findBasketProduct(name, price);
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

module.exports = router;