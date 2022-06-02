const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('Ao chamar o controller do getProducts', () => {
    describe('Em caso positivo', () => {
        const response = {};
        const request = {};
        
        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(productsService, 'getProducts').resolves([]);
        });
        
        after(() => {
            productsService.getProducts.restore();
        });

        it('É chamado com status 200', async () => {
            await productsController.get(request, response);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });
    });
});




describe('Ao chamar o controller do getById', () => {
    describe('Em caso positivo', () => {
        const response = {};
        const request = {};

        before(() => {
            request.params = { id: 1 }
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            
            sinon.stub(productsService, 'getProducts').resolves([[{ name: 'Manoplas de hulk', quantity: 10 }]]);
        });

        after(() => {
            productsService.getProducts.restore();
        });
        
        it('É chamado com status 200', async () => {
            await productsController.getById(request, response);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });
    });
});

describe('Ao chamar o controller do update', () => {
    describe('Em caso positivo', () => {
        const response = {};
        const request = {};
        
        before(() => {
            request.params = { id: 1 }
            request.body = { name: "Manoplas de Hulk", quantity: 10 };
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            
            sinon.stub(productsService, 'getProducts').resolves([[{ id: 1, name: 'Manoplas de hulk', quantity: 10 }]]);
            sinon.stub(productsService, 'updateProduct').resolves({ id: 1, name: 'Manoplas de hulk', quantity: 10 });
        });
        
        after(() => {
            productsService.getProducts.restore();
            productsService.updateProduct.restore();
        });
        
        it('É chamado com status 200', async () => {
            await productsController.updateProduct(request, response);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });
    });
});

describe('Ao chamar o controller do delete', () => {
    describe('Em caso positivo', () => {
        const response = {};
        const request = {};
        
        before(() => {
            request.params = { id: 1 }
            response.status = sinon.stub().returns(response);
            response.end = sinon.stub().returns();
            
            sinon.stub(productsService, 'getProducts').resolves([[{ id: 1, name: 'Manoplas de hulk', quantity: 10 }]]);
            sinon.stub(productsService, 'deleteProduct').resolves();
        });
        
        after(() => {
            productsService.getProducts.restore();
            productsService.deleteProduct.restore();
        });
        
        it('É chamado com status 200', async () => {
            await productsController.deleteProduct(request, response);
            expect(response.status.calledWith(204)).to.be.equal(true);
        });
    });
});

describe('Ao chamar o controller do addProduct', () => {
    describe('Em caso positivo', () => {
        const response = {};
        const request = {};

        before(() => {
            request.body = { name: 'Capra Demon', quantity: 20 };
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(productsService, 'getProducts').resolves([[{ name: 'Manoplas de hulk', quantity: 10 }]])
        });

        after(() => {
            productsService.getProducts.restore();
            productsService.addProduct.restore();
        });

        it('É chamado com status 201', async () => {
            sinon.stub(productsService, 'addProduct').resolves([{}])
            await productsController.addProduct(request, response);
            expect(response.status.calledWith(201)).to.be.equal(true);
        });
    });
})