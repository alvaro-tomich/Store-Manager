const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('Busca os produtos no db', () => {
    describe('Em caso positivo', () => {

        before(() => {
             const execute = [];

             sinon.stub(productsModel, 'getProducts').resolves(execute);
        });

        after(() => {
            productsModel.getProducts.restore();
        });

        it('retorna um array', async () => {
            const products = await productsService.getProducts();
            expect(products).to.be.an('array');
        });
    });
})

describe('Adiciona um novo produto no db', () => {
    describe('Em caso positivo', () => {

        before(() => {
            const execute = { id: 4, name:'Manoplas de Hulk', quantity: 10};

            sinon.stub(productsModel, 'add').resolves(execute);
       });

       after(() => {
           productsModel.add.restore();
       });

        it('Retorna um objeto', async () => {
            const name = "Manoplas de Hulk";
            const quantity = 10;
            const product = await productsService.addProduct(name, quantity);
            console.log(product);
            expect(product).to.be.an('object');
        })
    });
});