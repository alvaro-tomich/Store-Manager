const express = require('express');

const route = express.Router();

const productController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

route.use('/products', productController);
route.use('/sales', salesController);

module.exports = route;