const express = require('express');
const {
  getProducts, getProductById, createProduct,
  updateProduct, deleteProduct
} = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(auth, validateProduct, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(auth, validateProduct, updateProduct)
  .delete(auth, deleteProduct);

module.exports = router;
