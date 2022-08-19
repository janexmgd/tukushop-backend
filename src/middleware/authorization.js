const { failed } = require("../helper/response");

module.exports = {
  isBuyer: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 1) {
      next();
    } else {
      failed(res, {
        code: 500,
        status: "failed",
        message: "user dont have access",
        error: [],
      });
    }
  },
  isSeller: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 2) {
      next();
    } else {
      failed(res, {
        code: 500,
        status: "failed",
        message: "user dont have access",
        error: [],
      });
    }
  },
  isAdmin: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next();
    } else {
      failed(res, {
        code: 500,
        status: "failed",
        message: "user dont have access",
        error: [],
      });
    }
  },
};
