const express = require("express");

const router = express.Router();

// controller here
const {
  insert,
  all,
  detail,
  update,
  destroy,
  productCategory,
} = require("../controller/product.controller");

// middleware
const validationResult = require("../middleware/validation");

// validation
const {
  addProductValidation,
  updateProductValidation,
} = require("../validation/product.validation");

router
  .get("/product", all) // to get all
  .get("/product/:id", detail) // to get detail id
  .post("/product", addProductValidation, validationResult, insert) // to insert
  .put("/product/:id", updateProductValidation, validationResult, update) // to update product
  .delete("/product/:id", destroy) // to delete product
  .get("/product-category", productCategory); // to get product join category
module.exports = router;
