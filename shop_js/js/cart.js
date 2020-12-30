

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



class CartProductsList {
    constructor(container = '.cart-products'){// класс контейнера куда выводим товары в корзине
        this.container = container;
        this.goods = [];//массив товаров
        this.allCartProducts = [];//массив объектов
        this._getCartProducts()
            .then(data => { //data - объект js (в нашем случае массив в json файле)
                this.goods = [...data.contents];     // распаковываем объект
                this.render()
            });
    }


    _getCartProducts(){
        // fetch возвращает Promise
        return fetch(`${API}/getBasket.json`)
        // делаем из исходного файла json объект
        // json возвращает Promise
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum(){
        return this.allCartProducts.reduce((accum, item) => accum += item.contents.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new CartProductItem(product);
            this.allCartProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class CartProductItem {
    constructor(product, img = 'https://placehold.it/150x150'){
        // this.amount = cart.amount;
        // this.countGoods = cart.countGoods;
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = product.quantity;
        this.img = img;
    }
    //Функция для формирования верстки каждой позиции товара в корзине
    render(){
        return `<tr>
                <th scope="row">${this.title}</th>
                <td class="w-25"><img src="${this.img}" class="img-fluid" alt="Some img"></td>
                <td>${this.price} <span>руб.</span></td>
                <td>
                  <form action="#" method="POST">
                    <input type="number" class="form-control" name="qty" style="width: 70px;" min="1" value="1">
                    <br>
                    <input type="submit" class="btn btn-primary" value="Изменить кол-во">
                  </form>
                </td>
                <td>${this.amount} <span>руб.</span></td>
                <td>
                  <a href="#"><button class="btn btn-danger">Удалить из корзины</button></a>
                </td>
              </tr>`
    }
}

let list = new CartProductsList();