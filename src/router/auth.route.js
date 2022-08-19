const express = require("express");

// controller here
const {
  registerBuyer,
  loginBuyer,
  verifyEmail,
  registerSeller,
  loginSeller,
  loginAdmin,
} = require("../controller/auth.controller");

// middleware
const validationResult = require("../middleware/validation");

// validation
const {
  registerBuyerValidation,
  loginBuyerValidation,
  registerSellerValidation,
  loginSellerValidation,
  loginAdminValidation,
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
  .post(
    "/auth/register-seller",
    registerSellerValidation,
    validationResult,
    registerSeller
  ) // register seller
  .post(
    "/auth/login-seller",
    loginSellerValidation,
    validationResult,
    loginSeller
  )
  .post("/auth/login-admin", loginAdminValidation, validationResult, loginAdmin)
  .get("/auth/verify-email", verifyEmail); // verify email
module.exports = router;
