const express = require('express');

const route = express.Router();

const productController = require('./controllers/productsController');

route.use('/products', productController);

module.exports = route;