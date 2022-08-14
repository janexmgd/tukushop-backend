const { check } = require("express-validator");

const addProductValidation = [
  // name
  check("name", "name cannot be empty").not().isEmpty(),
  check("name", "name must be between 3 and 50 characters").isLength({
    min: 3,
    max: 50,
  }),

  // stock
  check("stock", "stock required").not().isEmpty(),
  check("stock", "stock value must be more than").isInt({
    min: 1,
  }),

  // price
  check("price", "price required").not().isEmpty(),
  check("price", "price value must be more than").isInt({
    min: 1,
  }),

  //categoryId
  check("categoryId", "categoryId required").not().isEmpty(),
];
const updateProductValidation = [
  // name
  check("name", "name cannot be empty").not().isEmpty(),
  check("name", "name must be between 3 and 50 characters").isLength({
    min: 3,
    max: 50,
  }),

  // stock
  check("stock", "stock required").not().isEmpty(),
  check("stock", "stock value must be more than 0").isInt({
    min: 1,
  }),

  // price
  check("price", "price required").not().isEmpty(),
  check("price", "price value must be more than 0").isInt({
    min: 1,
  }),

  //categoryId
  check("categoryId", "categoryId required").not().isEmpty(),
];

module.exports = {
  addProductValidation,
  updateProductValidation,
};
