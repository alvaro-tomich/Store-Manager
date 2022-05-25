const salesModel = require('../models/salesModel');

const getSales = (id = null) => {
    if (id) {
      return salesModel.getById(id);
    } 

   return salesModel.getSales(); 
};

module.exports = { getSales };