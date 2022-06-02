const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

describe('Ao chamar o controller do get', () => {
    describe('Em caso positivo', () => {
        const response = {};
        const request = {};

        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(salesService, 'getSales').resolves([]);
        });

        after(() => {
            salesService.getSales.restore();
        });

        it('É chamado com status 200', async () => {
            await salesController.get(request, response);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });
    });
});

describe('Ao chamar o controller do addSale', () => {
    describe('Em caso positivo', () => {
        const response = {};
        const request = {};

        before(() => {
            request.body = { name: 'Manoplas de hulk', quantity: 10 };
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(salesService, 'addSale').resolves([{ name: 'Manoplas de hulk', quantity: 10 }]);
        });

        after(() => {
            salesService.addSale.restore();
        });

        it('É chamado com status 201', async () => {
            await salesController.addSale(request, response);
            expect(response.status.calledWith(201)).to.be.equal(true);
        });
    });
})

describe('Ao chamar o controller do getById', () => {
    describe('Em caso positivo', () => {
        const response = {};
        const request = {};

        before(() => {
            request.params = { id: 1 }
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(salesService, 'getSales').resolves([[{ name: 'Manoplas de hulk', quantity: 10 }]]);
        });

        after(() => {
            salesService.getSales.restore();
        });

        it('É chamado com status 200', async () => {
            await salesController.getById(request, response);
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
            request.body = [{ productId: 1, quantity: 6 }];
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(salesService, 'updateSale').resolves({ saleId: 1, itemUpdated: [{ productId: 1, quantity: 10 }] });
        });

        after(() => {
            salesService.updateSale.restore();
        });

        it('É chamado com status 200', async () => {
            await salesController.updateSale(request, response);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });
    });
});