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
const jwtAuth = require("../middleware/jwtAuth");
const { isSeller } = require("../middleware/authorization");

// validation
const {
  addProductValidation,
  updateProductValidation,
} = require("../validation/product.validation");

router
  .get("/product", jwtAuth, all) // to get all
  .get("/product/:id", jwtAuth, detail) // to get detail id
  .post(
    "/product",
    jwtAuth,
    isSeller,
    addProductValidation,
    validationResult,
    insert
  ) // to insert
  .put(
    "/product/:id",
    jwtAuth,
    isSeller,
    updateProductValidation,
    validationResult,
    update
  ) // to update product
  .delete("/product/:id", jwtAuth, isSeller, destroy) // to delete product
  .get("/product-category", jwtAuth, productCategory); // to get product join category
module.exports = router;
