const express = require("express");

// controller
const { update } = require("../controller/seller.controller");

// middleware
const jwtAuth = require("../middleware/jwtAuth");
const { isSeller, isAdmin } = require("../middleware/authorization");
const validationResult = require("../middleware/validation");
const upload = require("../middleware/upload");

// validation
const { updateValidation } = require("../validation/seller.validation");

const router = express.Router();

router.put("/seller/:id", jwtAuth, isSeller, upload, updateValidation, update);

module.exports = router;
