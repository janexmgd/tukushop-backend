const express = require("express");

// controller here
const { detail, all, update } = require("../controller/buyer.controller");

// middleware
const jwtAuth = require("../middleware/jwtAuth");
const { isBuyer, isAdmin } = require("../middleware/authorization");
const validationResult = require("../middleware/validation");

// validation
const { updateValidation } = require("../validation/buyer.validation");

const router = express.Router();

router
  .get("/buyer", jwtAuth, isAdmin, all) // get all
  .get("/buyer/:id", jwtAuth, detail) // by id
  .put(
    "/buyer/:id",
    jwtAuth,
    isBuyer,
    updateValidation,
    validationResult,
    update
  ); // update user

module.exports = router;
