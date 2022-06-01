const validateSales = (req, res, next) => {
        req.body.map((curr) => {
        console.log(curr);
        if (curr.quantity < 1) { 
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
        }
        if (curr.quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });
        if (curr.productId === undefined) return res.status(400).json({ message: '"productId" is required' });

        return next();
    });
};

module.exports = validateSales;