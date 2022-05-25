const productsModel = require('../models/productsModel');

const getProducts = () => productsModel.getProducts();

module.exports = { getProducts };