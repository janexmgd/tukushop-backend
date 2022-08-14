const { validationResult } = require("express-validator");
const { failed } = require("../helper/response");

module.exports = (req, res, next) => {
  try {
    const err = validationResult(req);
    if (err.isEmpty()) {
      return next();
    }
    const extractErr = [];
    err.array().map((errors) => extractErr.push(errors.msg));
    return failed(res, {
      code: 400,
      status: "failed",
      message: "failed in validation",
      error: extractErr,
    });
  } catch (error) {
    failed(res, {
      code: 500,
      status: "error",
      message: "internal server error",
      error: error.message,
    });
  }
};
