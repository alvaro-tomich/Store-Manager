const express = require('express');

const route = express.Router();
const salesController = require('../controllers/salesController');
// const salesMiddleware = require('../middlewares/salesMiddleware');

route.get('/', salesController.get);
route.get('/:id', salesController.getById);
route.post('/', salesController.addSale);
route.put('/:id', salesController.updateSale);

module.exports = route;