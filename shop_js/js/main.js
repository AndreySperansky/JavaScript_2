
// Вместо локального массива products
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



class ProductsList {
    constructor(container = '.products'){// класс контейнера куда помещаем карточки товаров
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js (в нашем случае массив в json файле)
                this.goods = [...data];     // распаковываем объект
                this.render()
            });
    }

    // ************************************************************************************************
    //  Вариант ES-5  через коллбэк функцию

    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    // *************************************************************************************************

    _getProducts(){
        // fetch возвращает Promise
        return fetch(`${API}/catalogData.json`)
            // делаем из исходного файла json объект
            // json возвращает Promise
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/700x400'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    //Функция для формирования верстки каждого товара
    render(){
        return `<div class="col-lg-4 col-md-6 mb-4 product-item" data-id="${this.id}">
                    <div class="card h-100">
                      <a href="#"><img class="card-img-top" src='${this.img}' alt="Some img"></a>
                      <div class="card-body">
                        <h4 class="card-title">
                          <a href="#">${this.title}</a>
                        </h4>
                        <h5>${this.price} <span>руб.</span> </h5>
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
    }
}

let list = new ProductsList();


// Вариант для ES-5 *******************************************************************************

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };
// *************************************************************************************************




