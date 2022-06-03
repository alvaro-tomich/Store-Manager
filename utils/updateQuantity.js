const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const addSale = async (itemsSold) => {
    const [products] = await productsModel.getProducts();
    let newQuantity = 0;
    products.forEach((product) => {
        itemsSold.forEach((item) => {
          if (product.id === item.productId) {
            newQuantity = product.quantity - item.quantity;
            if (newQuantity >= 0) {
              productsModel.updateProduct(product.id, product.name, newQuantity);
            }
          }
        });
      });
  return newQuantity;
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
        }
      });
    }); 
};

module.exports = { addSale, removeSale };