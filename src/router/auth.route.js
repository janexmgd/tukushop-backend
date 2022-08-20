const express = require("express");

// controller here
const {
  registerBuyer,
  loginBuyer,
  verifyEmail,
  registerSeller,
  loginSeller,
  loginAdmin,
  updateStatus,
} = require("../controller/auth.controller");

// middleware
const validationResult = require("../middleware/validation");
const jwtAuth = require("../middleware/jwtAuth");
const { isAdmin } = require("../middleware/authorization");

// validation
const {
  registerBuyerValidation,
  loginBuyerValidation,
  registerSellerValidation,
  loginSellerValidation,
  loginAdminValidation,
  statusValidation,
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
  .get("/auth/verify-email", verifyEmail) // verify email
  .put(
    "/auth-status/:id",
    jwtAuth,
    isAdmin,
    statusValidation,
    validationResult,
    updateStatus
  ); // update status auth
module.exports = router;
