// Local API server URL: http://localhost:7000
// Cloud API server URL: https://eshop-node.herokuapp.com

const API_URL = 'http://localhost:7000'

const addButton = document.querySelector('.buttonSubmit');
const productShop = document.querySelector('.products-shop');

// Load all products when opening site (GET)
fetch(API_URL + '/api/products', { method: 'GET' })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data)
    showProducts(data);
  });

const checkBasket = () => {
  fetch(API_URL + '/api/basket', { method: 'GET' })
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach(data => {
        // Get the name of product through database then assign it to the variable 
        let productId = data.name;
        // Find id of clicked button (id assigned with name of product in showProducts when button element is created) 
        let checkButton = document.getElementById(productId);
        checkButton.classList.remove('buttonSubmit');
        checkButton.classList.add('buttonDisable');
        checkButton.disabled = true;
        checkButton.innerHTML = 'Added to basket';
      });
    });
};

// Get all products, after do this function with the data
// Create elements to the HTML DOM
const showProducts = dataProducts => {
  for (let i = 0; i < dataProducts.length; i++) {
    let productTag = document.createElement('p');
    let priceTag = document.createElement('p');
    let imgTag = document.createElement('img');
    let buttonTag = document.createElement('button');

    productTag.setAttribute('class', 'product');
    priceTag.setAttribute('class', 'price');
    imgTag.setAttribute('class', 'image');
    buttonTag.setAttribute('class', 'buttonSubmit');
    buttonTag.setAttribute('type', 'submit');
    buttonTag.setAttribute('id', `${dataProducts[i].name}`);
    buttonTag.innerHTML = 'Add product to basket';

    imgTag.setAttribute('width', '200');
    imgTag.setAttribute('height', '200');

    productTag.innerHTML = dataProducts[i].name;
    priceTag.innerHTML = dataProducts[i].price;
    imgTag.src = dataProducts[i].image;

    productShop.append(imgTag);
    productShop.append(productTag);
    productShop.append(priceTag);
    productShop.append(buttonTag);

    buttonTag.addEventListener('click', e => {
      addBasket(dataProducts);
    });

    // Add product to basket (POST)
    const addBasket = () => {
      let name = document.querySelectorAll('.product')[i].innerHTML;
      let price = document.querySelectorAll('.price')[i].innerHTML;

      const postUrl =
        API_URL +
        '/api/basket/addproducts' +
        '?name=' +
        name +
        '&price=' +
        price;

      fetch(postUrl, { method: 'POST' })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          checkBasket(data);
        });
    };
  }
};

// Grab the browser window object, when it has fully loaded (all HTML-tags loaded in), do following
// Check whether basket is empty or already containing products
window.addEventListener('load', () => {
  checkBasket();
});