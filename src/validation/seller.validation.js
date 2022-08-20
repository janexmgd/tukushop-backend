const { check } = require("express-validator");
const updateValidation = [
  // name
  check("name", "name cannot be empty").not().isEmpty(),
  check("name", "name must be between 3 and 50 characters").isLength({
    min: 3,
    max: 50,
  }),

  // phone
  check("phone", "Phone Number required").not().isEmpty(),
  check("phone", "Please Enter phone Number correctly").isMobilePhone(),

  // storeName
  check("storeName", "storeName cannot be empty").not().isEmpty(),
  check("storeName", "storeName must be between 3 and 50 characters").isLength({
    min: 3,
    max: 50,
  }),
];

module.exports = { updateValidation };
