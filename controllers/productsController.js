const productsService = require('../services/productsService');

const get = async (_req, res) => {
  const [products] = await productsService.getProducts();

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const [[product]] = await productsService.getProducts(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const [products] = await productsService.getProducts();
  const findProduct = products.some((product) => product.name === name);
  const newProduct = await productsService.addProduct(name, quantity);

  if (findProduct) return res.status(409).json({ message: 'Product already exists' }); 

  res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const [products] = await productsService.getProducts();
  const { id } = req.params;
  const { name, quantity } = req.body;
  const findProduct = products.some((product) => product.id === parseInt(id, 10));

  if (!findProduct) return res.status(404).json({ message: 'Product not found' });
  
  const update = await productsService.updateProduct(id, name, quantity);

  res.status(200).json({ id: update.id, name: update.name, quantity: update.quantity });
};

const deleteProduct = async (req, res) => {
  const [products] = await productsService.getProducts();
  const { id } = req.params;
  const findProduct = products.some((product) => product.id === parseInt(id, 10));

  if (!findProduct) return res.status(404).json({ message: 'Product not found' });

  const product = await productsService.deleteProduct(id);
  console.log(product);

  res.status(204).end();
};

module.exports = { get, getById, addProduct, updateProduct, deleteProduct };
