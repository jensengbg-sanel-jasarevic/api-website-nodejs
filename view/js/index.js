// Local API server URL: http://localhost:7000
// Cloud API server URL: https://eshop-node.herokuapp.com

const API_URL = 'http://localhost:7000'

const sectionProducts = document.querySelector('.products');

// Arrow function, parameter passed in is 'products', it contains array of objects.
const showProducts = products => { // In showProducts variable, an variable named addBasket (function) is also stored so it has access to the 'products' parameter.
  for (let i = 0; i < products.length; i++) {
      let productTag = document.createElement('p');
      let priceTag = document.createElement('p');
      let imgTag = document.createElement('img');
      let buttonTag = document.createElement('button');

      productTag.setAttribute('class', 'product');
      priceTag.setAttribute('class', 'price');
      imgTag.setAttribute('class', 'image');
      buttonTag.setAttribute('class', 'buttonAble'); 
      buttonTag.setAttribute('type', 'submit');
      buttonTag.setAttribute('id', `${products[i].name}`);
      buttonTag.innerHTML = 'Add product to basket';

      imgTag.setAttribute('width', '200');
      imgTag.setAttribute('height', '200');

      // Data getting back is array with objects. [i] = current value the iteration have in the for-loop. 
      // In every iteration [i] has different value so it will go through all the objects in the array.
      // In every iteration go inside the products array and pick the index that [i] value has on that iteration.
      productTag.innerHTML = products[i].name;
      priceTag.innerHTML = products[i].price;
      imgTag.src = products[i].image;

      sectionProducts.append(imgTag);
      sectionProducts.append(productTag);
      sectionProducts.append(priceTag);
      sectionProducts.append(buttonTag);

      buttonTag.addEventListener('click', () => { addBasket() } );

      const addBasket = () => {
        let name = document.querySelectorAll('.product')[i].innerHTML;
        let price = document.querySelectorAll('.price')[i].innerHTML;

        const addProduct = API_URL + '/api/basket' + '?name=' + name + '&price=' + price;

        fetch(addProduct, { method: 'POST' } )
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data)
            getBasketProducts(data);
          });
      };
  }
};

const getBasketProducts = () => {
  fetch(API_URL + '/api/basket', { method: 'GET' })
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach(data => {
        let productID = data.name; 
        let productButton = document.getElementById(productID);
        
        productButton.classList.remove('buttonAble');
        productButton.classList.add('buttonDisable');
        productButton.disabled = true;
        productButton.innerHTML = 'Added to basket';
      });
    });
};

// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.
window.addEventListener('load', () => {
  getBasketProducts();
});

fetch(API_URL + '/api/products', { method: 'GET' } )
  .then(response => {
    return response.json();
  })
  .then(data => {
    showProducts(data);
  });