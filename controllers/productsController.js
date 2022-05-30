const express = require('express');

const route = express.Router();
const productsService = require('../services/productsService');
const productsMiddleware = require('../middlewares/productsMiddleware');

route.get('/', async (_req, res) => {
  const [products] = await productsService.getProducts();

  res.status(200).json(products);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[product]] = await productsService.getProducts(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
});

route.post('/', productsMiddleware, async (req, res) => {
  const { name, quantity } = req.body;
  const [products] = await productsService.getProducts();
  const findProduct = products.some((product) => product.name === name);
  const newProduct = await productsService.addProduct(name, quantity);

  if (findProduct) return res.status(409).json({ message: 'Product already exists' }); 

  res.status(201).json(newProduct);
});

module.exports = route;
