const salesService = require('../services/salesService');

const get = async (_req, res) => {
  const sales = await salesService.getSales();

  res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSales(id);
  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
};

const addSale = async (req, res) => {
  const sale = await salesService.addSale(req.body);

  if (sale === 'true') {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }

  return res.status(201).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const [bodyData] = req.body;
  const { productId, quantity } = bodyData;
  const result = await salesService.updateSale(id, productId, quantity);

  res.status(200).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  salesService.deleteSale(id);
  res.status(204).end();
};

module.exports = { get, getById, addSale, updateSale, deleteSale };
