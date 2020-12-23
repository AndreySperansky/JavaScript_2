const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 200},
    {id: 3, title: 'Keyboard', price: 700},
    {id: 4, title: 'Gamepad', price: 500},
    {id: 5, title: 'Smartphone', price: 50000},
    {id: 6, title: 'LCD-display', price: 10000},
];

//Функция для формирования верстки каждого товара
const renderProduct = (title = 'item', price= 0) => {
    return `<div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                  <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
                  <div class="card-body">
                    <h4 class="card-title">
                      <a href="#">${title}</a>
                    </h4>
                    <h5>${price} <span>руб.</span> </h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <a href="#">
                      <button class="btn btn-danger">Добавить в корзину</button>
                    </a>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                  </div>
                </div>
            </div> `
};

// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item.title, item.price));
//
//     console.log(productslist);
//     document.querySelector('.products').innerHTML = productsList;
// };

// renderPage(products);

let out = '';
products.forEach(function(item) {
    out += renderProduct(item.title, item.price) + '<br>';
});

document.querySelector('.products').innerHTML = out;

