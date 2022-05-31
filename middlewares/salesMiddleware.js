const validateSales = (req, res, next) => {
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ message: '"productId" is required' });
    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (quantity < 1) { 
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
    }

    next();
};

module.exports = validateSales;