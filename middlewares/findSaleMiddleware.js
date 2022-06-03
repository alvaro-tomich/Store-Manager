const salesService = require('../services/salesService');

const findMiddleware = async (req, res, next) => {
    const sales = await salesService.getSales();
    const { id } = req.params;

    const findSale = sales.some((sale) => sale.saleId === parseInt(id, 10));

    if (!findSale) return res.status(404).json({ message: 'Sale not found' });

    next();
};

module.exports = findMiddleware;