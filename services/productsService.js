const productsModel = require('../models/productsModel');

const getProducts = (id = null) => {
    if (id) {
      return productsModel.getById(id);
    } 

   return productsModel.getProducts(); 
};

module.exports = { getProducts };