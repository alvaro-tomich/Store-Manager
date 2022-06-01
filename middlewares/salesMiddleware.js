function generateCases(cases) {
    let quantityMinorCase = 0;
    let quantityCase = 0;
    let productCase = 0;
    cases.forEach((curr) => {
      if (curr.quantity < 1) {
        quantityMinorCase += 1;
      }
      if (curr.quantity === undefined) {
        quantityCase += 1;
      }
      if (curr.productId === undefined) {
        productCase += 1;
      }
    });

    return [quantityMinorCase, quantityCase, productCase];
}

const validateSales = (req, res, next) => {
    const cases = generateCases(req.body);
    if (cases[0] !== 0) {
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    } 

    if (cases[1] !== 0) return res.status(400).json({ message: '"quantity" is required' });

    if (cases[2] !== 0) return res.status(400).json({ message: '"productId" is required' });

    return next();
};

module.exports = validateSales;