const express = require("express");
// const router = express.Router();

// controller here
const {
  registerBuyer,
  loginBuyer,
  verifyEmail,
} = require("../controller/auth.controller");

// middleware
const validationResult = require("../middleware/validation");

// validation

const {
  registerBuyerValidation,
  loginBuyerValidation,
} = require("../validation/auth.validation");

const router = express.Router();

router
  .post(
    "/auth/register-buyer",
    registerBuyerValidation,
    validationResult,
    registerBuyer
  ) // registerBuyer
  .post("/auth/login-buyer", loginBuyerValidation, validationResult, loginBuyer) // loginBuyer
  .get("/auth/verify-email", verifyEmail); // verify email
module.exports = router;
