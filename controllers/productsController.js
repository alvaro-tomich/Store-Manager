const productsService = require('../services/productsService');

const getProducts = async (_req, res) => {
  const [product] = await productsService.getProducts();

  res.status(200).json(product);
};

module.exports = { getProducts };
