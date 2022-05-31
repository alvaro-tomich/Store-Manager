const salesService = require('../services/salesService');

const get = async (_req, res) => {
  const sales = await salesService.getSales();

  res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSales(id);
  console.log(sale);
  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
};

const addSale = async (req, res) => {
  const result = await salesService.addSale(req.body);

  res.status(201).json(result);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const [bodyData] = req.body;
  const { productId, quantity } = bodyData;
  const result = await salesService.updateSale(id, productId, quantity);

  res.status(200).json(result);
};

module.exports = { get, getById, addSale, updateSale };
