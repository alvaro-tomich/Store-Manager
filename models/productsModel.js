const connection = require('./connection');

const getProducts = () => {
    const products = connection.execute('SELECT * FROM StoreManager.products');

    return products;
};

const getById = (id) => {
    const product = connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);

    return product;
};

module.exports = { getProducts, getById };