// Local API server URL: http://localhost:7000
// Cloud API server URL: https://eshop-node.herokuapp.com

const API_URL = 'http://localhost:7000'

const productsOrders = document.querySelector('.basket-products');

const basketProducts = orders => {
  for (let i = 0; i < orders.length; i++) {
    let divTag = document.createElement('div');
    let productTag = document.createElement('p');
    let priceTag = document.createElement('p');
    let imgTag = document.createElement('img');
    let buttonTag = document.createElement('button');

    buttonTag.innerHTML = 'Delete from basket';

    divTag.setAttribute('id', orders[i].name);
    priceTag.setAttribute('id', orders[i].price);
    imgTag.setAttribute('id', orders[i].image);
    buttonTag.setAttribute('class', 'buttonDelete');

    imgTag.setAttribute('width', '250');
    imgTag.setAttribute('height', '250');
    buttonTag.style.height = '2.5rem';
    buttonTag.style.width = '15%';

    productTag.innerHTML = orders[i].name;
    priceTag.innerHTML = orders[i].price;
    imgTag.src = orders[i].image;

    productsOrders.append(divTag);
    divTag.appendChild(imgTag);
    divTag.appendChild(productTag);
    divTag.appendChild(priceTag);
    divTag.appendChild(buttonTag);

    buttonTag.addEventListener('click', () => { removeProduct() } );
 
      const removeProduct = () => {
        let productName = divTag.getAttribute('id')
        let productPrice = priceTag.getAttribute('id')

        const deleteProduct = API_URL + '/api/basket' + '?name=' + productName + '&price=' + productPrice;

        fetch(deleteProduct, { method: 'DELETE' } )
          .then(response => {
            return response.json();
          })
          .then(data => {
            document.getElementById(`${productName}`).remove();
            alert(data.message);
          });
      };
    }
  };

fetch(API_URL + '/api/basket', { method: 'GET' } )
  .then(response => {
    return response.json();
  })
  .then(data => {
    basketProducts(data);
  });