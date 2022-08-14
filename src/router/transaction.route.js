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

router
  .get("/transaction", all) // to get all transaction
  .get("/transaction/:id", detail) // to get transaction by id
  .post("/transaction", addTransactionValidation, validationResult, insert) // to add transaction
  .delete("/transaction/:id", destroy) // to delete
  .get("/transaction-product-category", transactionProductCategory); // full list
module.exports = router;
