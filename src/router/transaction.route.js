const express = require("express");

const router = express.Router();

// controller here

const {
  insert,
  all,
  detail,
  transactionProductCategory,
  destroy,
} = require("../controller/transaction.controller");

// validation
const {
  addTransactionValidation,
} = require("../validation/transaction.validation");

// middleware
const validationResult = require("../middleware/validation");
const jwtAuth = require("../middleware/jwtAuth");
const { isBuyer } = require("../middleware/authorization");

router
  .get("/transaction", jwtAuth, all) // to get all transaction
  .get("/transaction/:id", jwtAuth, detail) // to get transaction by id
  .post(
    "/transaction",
    jwtAuth,
    isBuyer,
    addTransactionValidation,
    validationResult,
    insert
  ) // to add transaction
  .delete("/transaction/:id", jwtAuth, isBuyer, destroy) // to delete
  .get(
    "/transaction-product-category",
    jwtAuth,
    isBuyer,
    transactionProductCategory
  ); // full list

module.exports = router;
