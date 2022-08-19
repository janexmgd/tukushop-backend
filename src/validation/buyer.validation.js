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

  // gender
  check("gender", "gender cannot be empty").not().isEmpty(),
  check("gender", "gender value must be between 0 to 1").isInt({
    min: 0,
    max: 1,
  }),

  // birth
  check("birth", "birth cannot be empty").not().isEmpty(),
];

module.exports = { updateValidation };
