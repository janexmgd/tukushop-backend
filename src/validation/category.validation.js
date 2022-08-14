const { check } = require("express-validator");

const addCategoryValidation = [
  // name
  check("name", "name cannot be empty").not().isEmpty(),
  check("name", "name must be between 3 and 50 characters").isLength({
    min: 3,
    max: 50,
  }),
];
const updateCategoryValidation = [
  // name
  check("name", "name cannot be empty").not().isEmpty(),
  check("name", "name must be between 3 and 50 characters").isLength({
    min: 3,
    max: 50,
  }),
];

module.exports = {
  addCategoryValidation,
  updateCategoryValidation,
};
