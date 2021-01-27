// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const cart = {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          // imgCart: 'https://placehold.it/100x100',
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }


        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    template:
        `<div>
          <button class="btn btn-primary" type="button" @click="showCart = !showCart">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              <span class="badge badge-pill badge-danger">3</span>
          </button>
            
            <div class="cart-block" v-show="showCart">
                <cart-item v-for="item of cartItems"
                 :key="item.id_product"
                 :img="item.img"
                 :cart-item="item"
                 @remove="remove">
                </cart-item>
            </div>
         </div>
        `
    };

const cartItem = {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" width="100" height="100" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-title">{{ cartItem.model }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">{{ cartItem.price }} руб.</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="btn btn-danger" @click="$emit('remove', cartItem)">
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
    `
};


export default cart