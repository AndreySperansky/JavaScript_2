const products = {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           // imgProduct: 'https://placehold.it/200x150'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="row mt-5 products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.img"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
};

const product = {
    props: ['product', 'img'],
    template:

        `<div class="col-lg-4 col-md-6 mb-4 product-item">
                    <div class="card h-100">
                      <img class="card-img-top" :src="img" alt="Some img">
                      <div class="card-body">
                        <h4 class="card-title">
                          <a href="#">{{product.product_name}}</a><br>
                          <a href="#">{{product.model}}</a>
                        </h4>
                        <h5>{{product.price}}<span>руб.</span> </h5>
                        <button class="btn btn-danger" @click="$emit('add-product', product)">Добавить в корзину</button>
                      </div>
                      <div class="card-footer">
                        <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                      </div>
                    </div>
              </div> `
};

export default products