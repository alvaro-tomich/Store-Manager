const sinon = require('sinon');
const { expect } = require('chai');

const productsService = {
  getProducts: () => { }
};

describe('Testando rota GET /products', () => {
  describe('Quando há dados de products no banco', () => {
    const response = {};
    const request = {};
    const product = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    };

    before(() => {
      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProducts').resolves([product]);
    });

    after(() => {
      productsService.getProducts.restore();
    });

    it('Verífica se foi chamado o status 200', async () => {
      await productsService.getProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Verifica se o retorno do json é um objeto', async () => {
      await productsService.getProducts(request, response);

      expect(response.json[0]).to.be.a("object");
    });
  });
});
