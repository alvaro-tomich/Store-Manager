const express = require('express');

const route = express.Router();
const salesService = require('../services/salesService');

route.get('/', async (_req, res) => {
  const products = await salesService.getSales();

  res.status(200).json(products);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await salesService.getSales(id);
  console.log(product);
  if (product.length === 0) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(product);
});

module.exports = route;
