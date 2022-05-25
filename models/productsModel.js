const connection = require('./connection');

const getProducts = () => {
    const products = connection.execute('SELECT * FROM StoreManager.products');

    return products;
};

module.exports = { getProducts };