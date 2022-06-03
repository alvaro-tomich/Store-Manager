const express = require('express');

const route = express.Router();
const salesController = require('../controllers/salesController');
const salesMiddleware = require('../middlewares/salesMiddleware');
const findSaleMiddleware = require('../middlewares/findSaleMiddleware');

route.get('/', salesController.get);
route.get('/:id', salesController.getById);
route.put('/:id', salesMiddleware, salesController.updateSale);
route.post('/', salesMiddleware, salesController.addSale);
route.delete('/:id', findSaleMiddleware, salesController.deleteSale);

module.exports = route;