// import env
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { failed } = require("../helper/response");

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.APP_DATA = {
      tokenDecoded: decoded,
    };
    next();
  } catch (error) {
    failed(res, {
      code: 500,
      status: "error",
      message: error.message,
      error: [],
    });
    return;
  }
};
