const express = require('express');

const router = express.Router();

// controller here
const {
  insert,
  all,
  detail,
  update,
  destroy,
  productCategory,
  getProductbyCategoryName,
} = require('../controller/product.controller');

// middleware
const validationResult = require('../middleware/validation');
const jwtAuth = require('../middleware/jwtAuth');
const { isSeller } = require('../middleware/authorization');
const upload = require('../middleware/upload');

// validation
const {
  addProductValidation,
  updateProductValidation,
} = require('../validation/product.validation');

router
  .get('/product', all) // to get all
  .get('/product/:id', jwtAuth, detail) // to get detail id
  .post(
    '/product',
    jwtAuth,
    isSeller,
    upload,
    addProductValidation,
    validationResult,
    insert
  ) // to insert
  .put(
    '/product/:id',
    jwtAuth,
    isSeller,
    upload,
    updateProductValidation,
    validationResult,
    update
  ) // to update product
  .delete('/product/:id', jwtAuth, isSeller, destroy) // to delete product
  .get('/product-category', jwtAuth, productCategory) // to get product join category
  .get('/product/category/:name', jwtAuth, getProductbyCategoryName);
module.exports = router;
