const express = require('express');

const router = express.Router();

// insert controller here
const {
  insert,
  all,
  detail,
  update,
  destroy,
} = require('../controller/category.controller');

// insert middleware here
const validationResult = require('../middleware/validation');
const jwtAuth = require('../middleware/jwtAuth');
// const { isAdmin } = require('../middleware/authorization');
const upload = require('../middleware/upload');

// validation
const {
  addCategoryValidation,
  updateCategoryValidation,
} = require('../validation/category.validation');

router
  .get('/category', all) // to get all
  .get('/category/:id', jwtAuth, detail) // to get by id
  .post(
    '/category',
    jwtAuth,
    upload,
    addCategoryValidation,
    validationResult,
    insert
  ) // to add
  .put(
    '/category/:id',
    jwtAuth,
    upload,
    updateCategoryValidation,
    validationResult,
    update
  ) // to update
  .delete('/category/:id', jwtAuth, destroy); // to delete

module.exports = router;
