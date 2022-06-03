const connection = require('./connection');

const getProducts = () => {
    const products = connection.execute('SELECT * FROM StoreManager.products');

    return products;
};

const getById = (id) => {
    const product = connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);

    return product;
};

const add = async (name, quantity) => {
    const [product] = await connection.execute(`INSERT INTO StoreManager.products (name, quantity) 
    VALUES (?, ?)`, [name, quantity]);

    const result = {
        id: product.insertId,
        name,
        quantity,
    };

    return result;
};

const updateProduct = async (id, name, quantity) => {
    await connection.execute(`UPDATE StoreManager.products
     SET name = ?, quantity = ? WHERE id = ?;`, [name, quantity, id]);

     const result = {
         id,
         name,
         quantity,
     };

     return result;
};

const deleteProduct = async (id) => {
    const [product] = await connection.execute(
        'DELETE FROM StoreManager.products WHERE id = ?;', [id],
        );

    return product;
};

module.exports = { getProducts, getById, add, updateProduct, deleteProduct };