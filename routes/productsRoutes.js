const express = require('express');

const route = express.Router();
const productsController = require('../controllers/productsController');
const productsMiddleware = require('../middlewares/productsMiddleware');

route.get('/', productsController.get);
route.get('/:id', productsController.getById);
route.post('/', productsMiddleware, productsController.addProduct);
route.put('/:id', productsController.updateProduct);
route.delete('/:id', productsController.deleteProduct);

module.exports = route;