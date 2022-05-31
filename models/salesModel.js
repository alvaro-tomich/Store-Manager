const connection = require('./connection');

const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  date: saleData.date,
  productId: saleData.product_id,
  quantity: saleData.quantity,
});

const serializeById = (saleData) => ({
    date: saleData.date,
    productId: saleData.product_id,
    quantity: saleData.quantity,
  });

const getSales = async () => {
    const [products] = await connection.execute(`SELECT sap.sale_id, sa.date, sap.product_id,
     sap.quantity FROM StoreManager.sales 
     AS sa INNER JOIN StoreManager.sales_products AS sap ON sa.id = sap.sale_id;`);

    return products.map(serialize);
};

const getById = async (id) => {
    const [product] = await connection.execute(`SELECT sa.date, sap.product_id,
    sap.quantity FROM StoreManager.sales
    AS sa INNER JOIN StoreManager.sales_products
    AS sap ON sa.id = sap.sale_id WHERE sale_id = ?`, [id]);

    return product.map(serializeById);
};

const addSale = async () => {
  const [sale] = await connection.execute('INSERT INTO StoreManager.sales (date) VALUES(NOW())');

  return sale.insertId;
};

module.exports = { getSales, getById, addSale };