const express = require('express');

const route = express.Router();
const salesController = require('../controllers/salesController');

route.get('/', salesController.get);
route.get('/:id', salesController.getById);
route.post('/', salesController.addSale);

module.exports = route;