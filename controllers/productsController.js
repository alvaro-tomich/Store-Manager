const express = require('express');

const route = express.Router();
const productsService = require('../services/productsService');

route.get('/', async (_req, res) => {
  const [product] = await productsService.getProducts();

  res.status(200).json(product);
});

module.exports = route;
