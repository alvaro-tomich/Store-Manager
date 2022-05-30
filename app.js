const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const productsMiddleware = require('./middlewares/productsMiddleware');

const app = express();

app.use(express.json());

app.get('/products', productsController.get);

app.get('/products/:id', productsController.getById);

app.post('/products', productsMiddleware, productsController.addProduct);

app.get('/sales', salesController.get);

app.get('/sales/:id', salesController.getById);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
