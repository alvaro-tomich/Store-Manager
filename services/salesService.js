const salesModel = require('../models/salesModel');
const updateQuantity = require('../utils/updateQuantity');

const getSales = (id = null) => {
    if (id) {
      return salesModel.getById(id);
    } 

   return salesModel.getSales(); 
};

const addSale = async (itemsSold) => {
  const id = await salesModel.addSale();
  await updateQuantity.addSale(itemsSold);

  const itemsSoldPromisse = [];
  itemsSold.map((item) => itemsSoldPromisse.push(salesModel.addSaleProduct(
    id,
    item.productId,
    item.quantity,
)));
  const itemsSoldResolved = await Promise.all(itemsSoldPromisse);

  return {
    id,
    itemsSold: itemsSoldResolved,
  };
}; 

const updateSale = async (saleId, productId, quantity) => {
   await salesModel.updateSaleProduct(saleId, productId, quantity);
   return { saleId, itemUpdated: [{ productId, quantity }] };
};

const deleteSale = async (saleId) => {
  await updateQuantity.removeSale(saleId);
  return salesModel.deleteSale(saleId);
};

module.exports = { getSales, addSale, updateSale, deleteSale };