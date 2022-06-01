const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Busca os produtos no banco de dados', () => {

    before(async () => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

    describe('Em caso positivo', () => {
        it('Retorna um array', async () => {
            const products = await productsModel.getProducts();
            expect(products).to.be.an('array');
        })
    });
});

describe('Busca um produto pelo id', () => {
    describe('Em caso positivo', () => {

        before(async () => {
            const execute = [[{id: 1, name: "Martelo de Thor", quantity: 10}]];
    
            sinon.stub(connection, 'execute').resolves(execute);
          });
    
          after(async () => {
            connection.execute.restore();
          });
          
        it('Retorna um array', async () => {
            const [product] = await productsModel.getById(1);
            expect(product).to.be.an('array');
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
            const [product] = await productsModel.getById(5);
            expect(product.length).to.be.equal(0);
        });
    });
});

describe('Insere um novo produto no db', () => {
    describe('Em caso positivo', () => {

        before(async () => {
            const execute = [[{ id: 1, name: "Martelo de Thor", quantity: 10 }]];
    
            sinon.stub(connection, 'execute').resolves(execute);
          });
    
          after(async () => {
            connection.execute.restore();
          });

        it('retorna um objeto', async () => {
            const insertProduct = await productsModel.add('Manopla do Hulk', 5);

            expect(insertProduct).to.be.an('object');
        });

        it('objeto possui a chave ID', async () => {
            const response = await productsModel.add('Manopla do Hulk', 5);
      
            expect(response).to.have.a.property('id')
          });
    })
});

describe('Atualiza um produto no db', () => {
    describe('Em caso positivo', () => {

        before(async () => {
            const execute = [{id: 1, name: "Martelo de Thor", quantity: 10}];
    
            sinon.stub(connection, 'execute').resolves(execute);
          });
    
          after(async () => {
            connection.execute.restore();
          });

        it('retorna um objeto', async () => {
            const product = await productsModel.updateProduct(1, 'Manopla do Hulk', 20);

            expect(product).to.be.an('object');
        });
    });
});

describe('Deleta um objeto do db', () => {
    describe('Em caso positivo', () => {

        before(async () => {
            const execute = [{ affectedRows: 1 }];
    
            sinon.stub(connection, 'execute').resolves(execute);
          });
    
          after(async () => {
            connection.execute.restore();
          });

        it('Retorna quantidade de linhas afetadas', async () => {
            const deleted = await productsModel.deleteProduct(1);
            expect(deleted.affectedRows).to.be.equal(1);
        })
    })
});