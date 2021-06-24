const db = require('../model/database-functions');
const { Router } = require("express");

const router = new Router();

// POST product to basket
router.post('/', async (req, res) => {
    const name = req.query.name;
    const price = parseInt (req.query.price);
  
    let resObj = {
      success: true
    };
  
    const findBasket = db.findBasketProduct(name, price);
    const findProduct = db.findProduct(name, price);
  
  if (findBasket) {
      resObj.message = 'Product already exist in shopping basket.'
      res.send(resObj);
    } else if (!findProduct) {
      resObj.message = 'Product not existing in list of products.'
      res.send(resObj);
    } else {
      db.addProduct(name, price);
      resObj.message = 'Product added to shopping basket.'
      res.send(resObj);
    }
  });
  
  // GET products from basket
  router.get('/', async (req, res) => {
    const data = await db.getBasket();
    res.send(data);
  });

  // DELETE product from basket
  router.delete('/', async (req, res) => {
    const name = req.query.name;
    const price = parseInt (req.query.price);
  
    let resObj = {
      success: false
    };
  
    const findBasket = db.findBasketProduct(name, price);

    if (!findBasket) {
      resObj.message = 'Product not existing in shopping basket.'
      res.send(resObj);
    } else {
      db.removeBasketProduct(name, price);
      resObj.message = 'Product deleted from shopping basket.'
      resObj.success = true;
      res.send(resObj);
    }
  });

module.exports = router;