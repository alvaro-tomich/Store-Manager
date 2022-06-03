const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const addSale = async (itemsSold) => {
    const [products] = await productsModel.getProducts();
    let newQuantity = 0;
    products.forEach((product) => {
        itemsSold.forEach((item) => {
          if (product.id === item.productId) {
            newQuantity = product.quantity - item.quantity;
            productsModel.updateProduct(product.id, product.name, newQuantity);
            console.log(newQuantity);
          }
        });
      });
};

const removeSale = async (saleId) => {
    const sales = await salesModel.getById(saleId);
    const [products] = await productsModel.getProducts();
    let newQuantity = 0;
    sales.forEach((sale) => {
      products.forEach((product) => {
        if (sale.productId === product.id) {
          newQuantity = product.quantity + sale.quantity;
          productsModel.updateProduct(product.id, product.name, newQuantity);
          console.log(newQuantity);
        }
      });
    }); 
};

module.exports = { addSale, removeSale };