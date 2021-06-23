const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database-shop.json');
const db = lowdb(adapter);

const imageURL = 'https://placeimg.com/640/480/any';

module.exports = {
  dbInit,
  getProducts,
  findProduct,
  addProduct,
  getBasket,
  findBasketProduct, 
  removeBasketProduct
}

// Initialize database shop
function dbInit() {
    const dbProducts = db.has('products').value();
    const dbBasket = db.has('basket').value();

    if (!dbProducts || !dbBasket) {
      db.defaults({ products: [] }).write();
      db.defaults({ basket: [] }).write();
    }
  };

function getProducts() {
  return db.get('products').value();
};

function findProduct (nameParam, priceParam) {
  const response = db
    .get('products')
    .find({ name: nameParam, price: priceParam })
    .value();
  return response;
};

function getBasket() {
  return db.get('basket').value();
};

async function addProduct (nameParam, priceParam)  {
  const response = await db
    .get('basket')
    .push({ name: nameParam, price: priceParam, image: imageURL })
    .write();
  return response;
};

function findBasketProduct (nameParam, priceParam) {
  const response = db
    .get('basket')
    .find({ name: nameParam, price: priceParam })
    .value();
  return response;
};

async function removeBasketProduct (nameParam, priceParam) {
  const response = await db
    .get('basket')
    .remove({ name: nameParam, price: priceParam, image: imageURL })
    .write();
  return response;
};