const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Busca as vendas no banco de dados', () => {

    before(async () => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

    describe('Em caso positivo', () => {
        it('Retorna um array', async () => {
            const sales = await salesModel.getSales();
            console.log(sales);
            expect(sales).to.be.an('array');
        })
    });
});

describe('Busca uma venda pelo id', () => {
    describe('Em caso positivo', () => {

        before(async () => {
            const execute = [[{date: '2022-06-01T17:50:55.000Z', productId: 2, quantity: 10}]];
    
            sinon.stub(connection, 'execute').resolves(execute);
          });
    
          after(async () => {
            connection.execute.restore();
          });
          
        it('Retorna um array', async () => {
            const sale = await salesModel.getById(1);
            expect(sale).to.be.an('array');
        });
    });
    describe('Em caso Negativo', () => {

        before(async () => {
            const execute = [[]];
    
            sinon.stub(connection, 'execute').resolves(execute);
          });
    
          after(async () => {
            connection.execute.restore();
          });

        it('Retorna um array vazio se não encontrar o id', async () => {
            const sale = await salesModel.getById(5);
            expect(sale.length).to.be.equal(0);
        });
    });
});

describe('Insere uma nova venda no db', () => {
    describe('Em caso positivo', () => {

        before(async () => {
            const execute = [{ id: 3, itemsSold: [{ productId: 1, quantity: 2 }]}];
    
            sinon.stub(connection, 'execute').resolves(execute);
          });
    
          after(async () => {
            connection.execute.restore();
          });

        it('retorna um objeto', async () => {
            const insertProduct = await salesModel.addSaleProduct([{ productId: 1, quantity: 2}]);

            expect(insertProduct).to.be.an('object');
        });
    })
});