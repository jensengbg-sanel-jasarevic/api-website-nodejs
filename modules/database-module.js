const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database-shop.json');
const databaseShop = lowdb(adapter);
const imageUrl = 'https://placeimg.com/640/480/any';


// Initialize database shop
exports.dbInit = () => {
    const dbProducts = databaseShop.has('databaseProducts').value();
    const dbBasket = databaseShop.has('databaseBasket').value();

    if (!dbProducts || !dbBasket) {
      databaseShop.defaults({ databaseProducts: [] }).write();
      databaseShop.defaults({ databaseBasket: [] }).write();
    }
  };

  // Get all products from databaseProducts in databaseShop
exports.getProducts = async () => {
  return databaseShop.get('databaseProducts').value();
};

// Get all products from databaseBasket in databaseShop
exports.getBasket = () => {
  return databaseShop.get('databaseBasket').value();
};

// Add product to basket
exports.addProduct = async (nameParam, priceParam) => {
  const response = await databaseShop
    .get('databaseBasket')
    .push({ productName: nameParam, productPrice: priceParam, productImage: imageUrl })
    .write();
  return response;
};

// Check if product exist in database basket
exports.findBasket = (nameParam, priceParam) => {
  const response = databaseShop
    .get('databaseBasket')
    .find({ productName: nameParam, productPrice: priceParam })
    .value();
  return response;
};

// Check if product exist in database products
exports.findProduct = (nameParam, priceParam) => {
  const response = databaseShop
    .get('databaseProducts')
    .find({ productName: nameParam, productPrice: priceParam })
    .value();
  return response;
};

// Delete product from basket
exports.removeProduct = async (nameParam, priceParam) => {
  const response = await databaseShop
    .get('databaseBasket')
    .remove({ productName: nameParam, productPrice: priceParam, productImage: imageUrl })
    .write();
  return response;
};