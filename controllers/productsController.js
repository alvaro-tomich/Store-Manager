const express = require('express');

const route = express.Router();
const productsService = require('../services/productsService');

route.get('/', async (_req, res) => {
  const [products] = await productsService.getProducts();

  res.status(200).json(products);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[product]] = await productsService.getProducts(id);

  res.status(200).json(product);
});

module.exports = route;
