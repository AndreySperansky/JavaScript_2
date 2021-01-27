let add = (cart, req) => {
    cart.contents.push(req.body);   // cart - даднные JSON - файла userCart.json
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change
};