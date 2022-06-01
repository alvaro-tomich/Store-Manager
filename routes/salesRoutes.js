const express = require('express');

const route = express.Router();
const salesController = require('../controllers/salesController');
const salesMiddleware = require('../middlewares/salesMiddleware');

route.get('/', salesController.get);
route.get('/:id', salesController.getById);
route.put('/:id', salesMiddleware, salesController.updateSale);
route.post('/', salesMiddleware, salesController.addSale);

module.exports = route;