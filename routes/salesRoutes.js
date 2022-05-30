const express = require('express');

const route = express.Router();
const salesController = require('../controllers/salesController');

route.get('/', salesController.get);
route.get('/:id', salesController.getById);

module.exports = route;