const salesModel = require('../models/salesModel');

const getProducts = (id = null) => {
    if (id) {
      return salesModel.getById(id);
    } 

   return salesModel.getProducts(); 
};

module.exports = { getProducts };