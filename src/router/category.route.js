const express = require("express");

const router = express.Router();

// insert controller here
const {
  insert,
  all,
  detail,
  update,
  destroy,
} = require("../controller/category.controller");

// insert middleware here
const validationResult = require("../middleware/validation");

// validation
const {
  addCategoryValidation,
  updateCategoryValidation,
} = require("../validation/category.validation");

router
  .get("/category", all) // to get all
  .get("/category/:id", detail) // to get by id
  .post("/category", addCategoryValidation, validationResult, insert) // to add
  .put("/category/:id", updateCategoryValidation, validationResult, update) // to update
  .delete("/category/:id", destroy); // to delete

module.exports = router;
