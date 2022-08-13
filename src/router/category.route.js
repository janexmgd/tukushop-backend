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

router
  .get("/category", all) // to get all
  .get("/category/:id", detail) // to get by id
  .post("/category", insert) // to add
  .put("/category/:id", update) // to update
  .delete("/category/:id", destroy); // to delete

module.exports = router;
