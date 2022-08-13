const express = require("express");

const router = express.Router();

// controller here

const { insert, all, detail } = require("../controller/transaction.controller");

router
  .get("/transaction", all) // to get all transaction
  .get("/transaction/:id", detail) // to get transaction by id
  .post("/transaction", insert); // to add transaction

module.exports = router;
