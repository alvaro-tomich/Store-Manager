const productsModel = require('../models/productsModel');

const getProducts = (id = null) => {
    if (id) {
      return productsModel.getById(id);
    } 

   return productsModel.getProducts(); 
};

const addProduct = async (name, quantity) => {
  const product = await productsModel.add(name, quantity);

  return product;
};

module.exports = { getProducts, addProduct };