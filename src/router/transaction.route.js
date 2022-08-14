const express = require("express");

const router = express.Router();

// controller here

const { insert, all, detail } = require("../controller/transaction.controller");

// validation
const {
  addTransactionValidation,
} = require("../validation/transaction.validation");

// middleware
const validationResult = require("../validation/transaction.validation");

router
  .get("/transaction", all) // to get all transaction
  .get("/transaction/:id", detail) // to get transaction by id
  .post("/transaction", addTransactionValidation, validationResult, insert); // to add transaction

module.exports = router;
