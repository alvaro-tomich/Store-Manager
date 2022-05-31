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

const updateProduct = async (id, name, quantity) => {
  const product = await productsModel.updateProduct(id, name, quantity);
  
  return product;
};

const deleteProduct = async (id) => {
  const product = await productsModel.deleteProduct(id);

  return product;
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };