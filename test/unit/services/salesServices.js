const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');
const updateQuantity = require('../../../utils/updateQuantity');

describe('Busca as vendas no db', () => {

    before(() => {
        const execute = [];
        sinon.stub(salesModel, 'getSales').resolves(execute);
    })

    after(() => {
        salesModel.getSales.restore();
    })

    describe('Em caso positivo', () => {
        it('retorna um array', async () => {
            const sales = await salesService.getSales();
            expect(sales).to.be.an('array');
        });
    });
});

describe('Adiciona uma venda no db', () => {
    describe('Em caso positivo', () => {

         before(() => {
            const response = 3;
            sinon.stub(salesModel, 'addSale').resolves(response);
            const execute = { id: response, itemsSold: [ { productId: 1, quantity: 10 } ] };
            sinon.stub(salesModel, 'addSaleProduct').resolves(execute);
            sinon.stub(updateQuantity, 'addSale').resolves();
        });
    
        after(() => {
            salesModel.addSale.restore();
            salesModel.addSaleProduct.restore();
            updateQuantity.addSale.restore();
        });

        it('Retorna um objeto', async () => {
            const payload = [{ productId: 1, quantity: 10 }]
            const newSale = await salesService.addSale(payload);
            expect(newSale).to.be.an('object');
        });
    });
})

describe('Deleta uma venda no db', () => {
    describe('Em caso positivo', () => {

         before(() => {
            const execute = { affectedRows: 1 };

            sinon.stub(salesModel, 'deleteSale').resolves(execute);
            sinon.stub(updateQuantity, 'removeSale').resolves();
        });
    
        after(() => {
            salesModel.deleteSale.restore();
            updateQuantity.removeSale.restore();
        });

        it('Retorna as linhas afetadas', async () => {
            const sale = await salesService.deleteSale(1);
            expect(sale).to.be.a('object');
            expect(sale.affectedRows).to.be.equal(1);
        });
    });
})