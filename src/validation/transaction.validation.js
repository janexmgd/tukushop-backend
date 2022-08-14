const { check } = require("express-validator");

const addTransactionValidation = [
  // productId
  check("productId", "productId required").not().isEmpty(),

  // productAmount
  check("productAmount", "productAmount required").not().isEmpty(),
  check("productAmount", "productAmount must be more than").isInt({
    min: 1,
  }),
];

module.exports = {
  addTransactionValidation,
};
