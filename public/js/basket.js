// Local API server URL: http://localhost:7000
// Cloud API server URL: https://eshop-node.herokuapp.com

const API_URL = 'https://eshop-node.herokuapp.com'

const showBasket = document.querySelector('.show-basket');

fetch(API_URL + '/basket', { method: 'GET' })
  .then(response => {
    return response.json();
  })
  .then(data => {
    basketProducts(data);
  });

const basketProducts = dataBasket => {
  for (let i = 0; i < dataBasket.length; i++) {
    let divTag = document.createElement('div');
    let productTag = document.createElement('p');
    let priceTag = document.createElement('p');
    let imgTag = document.createElement('img');
    let buttonTag = document.createElement('button');

    buttonTag.innerHTML = 'Delete from basket';

    divTag.setAttribute('id', `product${dataBasket[i].productName}`);
    divTag.setAttribute('class', 'div-box');
    productTag.setAttribute('id', dataBasket[i].productName);
    priceTag.setAttribute('id', dataBasket[i].productPrice);
    imgTag.setAttribute('id', dataBasket[i].productImage);
    buttonTag.setAttribute('class', 'buttonDelete');

    imgTag.setAttribute('width', '250');
    imgTag.setAttribute('height', '250');
    buttonTag.style.height = '2.5rem';
    buttonTag.style.width = '15%';

    productTag.innerHTML = dataBasket[i].productName;
    priceTag.innerHTML = dataBasket[i].productPrice;
    imgTag.src = dataBasket[i].productImage;

    showBasket.append(divTag);
    divTag.appendChild(imgTag);
    divTag.appendChild(productTag);
    divTag.appendChild(priceTag);
    divTag.appendChild(buttonTag);

    buttonTag.addEventListener('click', e => {   
      eraseElements(
        dataBasket[i].productName,
        dataBasket[i].productPrice,
      );
    });
    
    const eraseElements = (nameParam, priceParam) => {
      let productTagErase = document.getElementById(`${nameParam}`).innerHTML;
      let priceTagErase = document.getElementById(`${priceParam}`).innerHTML;
      let productBoxErase = document.getElementById(`product${nameParam}`);

      const deleteUrl =
        API_URL +
        '/basket/deleteproducts' +
        '?name=' +
        productTagErase +
        '&price=' +
        priceTagErase;

      fetch(deleteUrl, { method: 'DELETE' })
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert(data.message);
        });
      productBoxErase.remove();
    };
  }
};
