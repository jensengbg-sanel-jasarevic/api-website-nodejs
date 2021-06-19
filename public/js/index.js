const localURL = 'http://localhost:7000';
const cloudURL = 'https://eshop-node.herokuapp.com'

const addButton = document.querySelector('.buttonSubmit');
const productShop = document.querySelector('.products-shop');

// Load all products when opening site (GET)
fetch(cloudURL + '/products', { method: 'GET' })
  .then(response => {
    return response.json();
  })
  .then(data => {
    showProducts(data);
  });

const checkBasket = () => {
  fetch(cloudURL + '/basket', { method: 'GET' })
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach(data => {
        // Get the name of product through database then assign it to the variable 
        let productId = data.productName;
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
    buttonTag.setAttribute('id', `${dataProducts[i].productName}`);
    buttonTag.innerHTML = 'Add product to basket';

    imgTag.setAttribute('width', '200');
    imgTag.setAttribute('height', '200');

    productTag.innerHTML = dataProducts[i].productName;
    priceTag.innerHTML = dataProducts[i].productPrice;
    imgTag.src = dataProducts[i].productImage;

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
        cloudURL +
        '/basket/addproducts' +
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