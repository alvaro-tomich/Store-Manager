const validateProducts = (req, res, next) => {
    const { name, quantity } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < 5) { 
        return res.status(422).json(
            { message: '"name" length must be at least 5 characters long' },
        ); 
    }
    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (quantity < 1) { 
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
    }

    next();
};

module.exports = validateProducts;