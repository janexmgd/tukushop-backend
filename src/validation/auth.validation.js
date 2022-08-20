const { check } = require("express-validator");

const registerBuyerValidation = [
  // name
  check("name", "name cannot be empty").not().isEmpty(),
  check("name", "name must be between 3 and 50 characters").isLength({
    min: 3,
    max: 50,
  }),

  // email
  check("email", "email cannot be empty").not().isEmpty(),
  check("email", "please enter email correctly").isEmail(),
  check("email", "Email maximum length is 50 characters").isLength({ max: 50 }),

  // password
  check("password", "Password required").not().isEmpty(),
  check("password", "Password require 8 or more characters").isLength({
    min: 8,
  }),
  check(
    "password",
    "Password must include one lowercase character, one uppercase character, a number, and a special character."
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
];
const loginBuyerValidation = [
  // email
  check("email", "email cannot be empty").not().isEmpty(),
  check("email", "please enter email correctly").isEmail(),
  check("email", "Email maximum length is 50 characters").isLength({ max: 50 }),

  // password
  check("password", "Password required").not().isEmpty(),
  check("password", "Password require 8 or more characters").isLength({
    min: 8,
  }),
  check(
    "password",
    "Password must include one lowercase character, one uppercase character, a number, and a special character."
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
];
const registerSellerValidation = [
  // name
  check("name", "name cannot be empty").not().isEmpty(),
  check("name", "name must be between 3 and 50 characters").isLength({
    min: 3,
    max: 50,
  }),

  // email
  check("email", "email cannot be empty").not().isEmpty(),
  check("email", "please enter email correctly").isEmail(),
  check("email", "Email maximum length is 50 characters").isLength({ max: 50 }),

  // phone
  check("phone", "Phone Number required").not().isEmpty(),
  check("phone", "Please Enter phone Number correctly").isMobilePhone(),

  // storeName
  check("storeName", "store name cannot be empty").not().isEmpty(),
  check("storeName", "store name must be between 3 and 50 characters").isLength(
    {
      min: 3,
      max: 50,
    }
  ),

  // password
  check("password", "Password required").not().isEmpty(),
  check("password", "Password require 8 or more characters").isLength({
    min: 8,
  }),
  check(
    "password",
    "Password must include one lowercase character, one uppercase character, a number, and a special character."
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
];
const loginSellerValidation = [
  // email
  check("email", "email cannot be empty").not().isEmpty(),
  check("email", "please enter email correctly").isEmail(),
  check("email", "Email maximum length is 50 characters").isLength({ max: 50 }),

  // password
  check("password", "Password required").not().isEmpty(),
  check("password", "Password require 8 or more characters").isLength({
    min: 8,
  }),
  check(
    "password",
    "Password must include one lowercase character, one uppercase character, a number, and a special character."
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
];
const loginAdminValidation = [
  // email
  check("email", "email cannot be empty").not().isEmpty(),
  check("email", "please enter email correctly").isEmail(),
  check("email", "Email maximum length is 50 characters").isLength({ max: 50 }),

  // password
  check("password", "Password required").not().isEmpty(),
  check("password", "Password require 8 or more characters").isLength({
    min: 8,
  }),
  check(
    "password",
    "Password must include one lowercase character, one uppercase character, a number, and a special character."
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
];
const statusValidation = [
  // gender
  check("isActive", "isActive cannot be empty").not().isEmpty(),
  check("isActive", "isActive value must be true or false").isBoolean(),
];
module.exports = {
  registerBuyerValidation,
  loginBuyerValidation,
  registerSellerValidation,
  loginSellerValidation,
  loginAdminValidation,
  statusValidation,
};
