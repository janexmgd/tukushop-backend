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

router
  .get("/product", all) // to get all
  .get("/product/:id", detail) // to get detail id
  .post("/product", insert) // to insert
  .put("/product/:id", update) // to update product
  .delete("/product/:id", destroy) // to delete product
  .get("/product-category", productCategory); // to get product join category
module.exports = router;
