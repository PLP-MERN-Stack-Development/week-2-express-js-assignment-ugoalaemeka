const products = require('../models/product');

exports.getProducts = (req, res) => {
  let result = [...products];
  const { search, page = 1, limit = 10 } = req.query;

  if (search) {
    result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = result.slice(start, end);

  res.json({ total: result.length, page: +page, limit: +limit, data: paginated });
};

exports.getProductById = (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next({ status: 404, message: 'Product not found' });
  res.json(product);
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: Date.now().toString(), name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: 'Product not found' });

  const updated = { ...products[index], ...req.body };
  products[index] = updated;
  res.json(updated);
};

exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: 'Product not found' });

  products.splice(index, 1);
  res.status(204).send();
};
