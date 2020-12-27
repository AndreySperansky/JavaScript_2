

class Cart{

    constructor(customer, products, qty){
        this.customer = customer;
        this.products = {} || products;
        this.qty = qty || 1;


    };

    //Добавляет продукт в корзину
    addProduct(product) {
        this.productObject(product);
        this.renderProduct(product);
        this.productsTotalRender();
        this.productAddDeleteListeners();
        this.productsQtyInCart();
    }


    /* Обрабатывает событие кнопки удаления товара */
    productDeleteListener(event) {
        this.productDelete(event);
        this.productsTotalRender();
        this.productsQtyInCart();
    };

    // Сам продукт в объекте
    productObject(product) {
        if (this.products[product.id] == undefined) {
            this.products[product.id] = {
                img:product.img,
                price: product.price,
                name: product.name,
                count: 1
            }
        }

        else {
            this.products[product.id].count++;
        }
    }



    /* Отрисовывает продукт в корзине */
    renderProduct(product) {
        let productCartExists = document.querySelector(`.productCount[data-id="${product.id}"]`);
        if (productCartExists !== null) {
            productCartExists.textContent++;
            return;
        }
        let productUnit = `
                            <li class="shop-item">
                                <div class="shop-cart">
                                    <div class="image-shop">
                                        <img src="${product.img}" alt="">
                                    </div>
                                    <div class="next-shop">
                                        <i class="fa fa-times-circle productDelete" data-id="${product.id}"></i>
                                    </div>
                                    <div class="list-names">
                                        <a href="${product.id}">${product.name}</a>
    
                                    </div>
                                    <span class="price">
                                        <span class="amount">${product.price} руб/м2</span>
                                    </span>
                                    <div class="list-qty">
                                        <p>ШТУК: <span class="productCount" data-id="${product.id}">1</span></p>
                                    </div>
                                </div>
                            </li>`;
        // let tbody = document.querySelector('.menu-shop');
        tbody.insertAdjacentHTML("afterbegin", productUnit);
    };


    /* Добавляет слушателей события на кнопки удаления */
    productAddDeleteListeners(){
        let delBtns = document.querySelectorAll('.productDelete');
        for (let i = 0; i < delBtns.length; i++) {
            delBtns[i].addEventListener('click', this.productDeleteListener);
        }
    };

    /* Пишет сумму и количество товаров */
    productsTotalRender() {
        document.querySelector('.shop-price').textContent = this.productsTotal();

    };

    /* Рендерит количество продуктов  */
    productsQtyInCart() {
        this.qty = document.querySelectorAll('.menu-shop>li').length-1;
        document.querySelector('.clor-cart').textContent = this.qty;
    };

    productDelete(event) {
        let id = event.targer.dataset.id;
        // this.productDeleteFromObj(id);
        this.productDeleteFromCart(id);
    };

    // Удалить из корзины
    productDeleteFromCart(id) {
        delete cart[id]
    };


}

