const connection = require('./connection');

const getSales = () => {
    const products = connection.execute('SELECT * FROM StoreManager.sales');

    return products;
};

const getById = (id) => {
    const product = connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);

    return product;
};

module.exports = { getSales, getById };