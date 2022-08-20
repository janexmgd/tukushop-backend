const authModel = require("../model/auth.model");
const { v4: uuidv4 } = require("uuid");
const { success, failed } = require("../helper/response");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendMail = require("../helper/sendEmail");
const jwtToken = require("../helper/generateJWTToken");
const sellerModel = require("../model/seller.model");

const authController = {
  registerBuyer: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const emailCheck = await authModel.findBy("email", email);
      if (!emailCheck.rowCount) {
        // to table auth

        const authId = uuidv4();
        const level = 1;
        const isActive = false;
        const verifyToken = crypto.randomBytes(16).toString("hex");
        const passwordHashed = await bcrypt.hash(password, 10);
        const dataToAuth = {
          authId,
          email,
          passwordHashed,
          level,
          isActive,
          verifyToken,
        };
        await authModel.insertToAuth(dataToAuth);

        // to table buyer

        const buyerId = uuidv4();
        const userId = authId;
        const photo = "user_default.png";
        const dataToBuyer = {
          buyerId,
          userId,
          name,
          photo,
        };
        await authModel.insertToBuyer(dataToBuyer);
        sendMail.sendConfirmationEmail(email, verifyToken, name);
        success(res, {
          code: 200,
          status: "success",
          message: "Register as buyer success",
          data: {
            ...dataToAuth,
            ...dataToBuyer,
          },
        });
      } else {
        const err = {
          message: "email is already registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
    } catch (error) {
      failed(res, {
        code: 500,
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  loginBuyer: async (req, res) => {
    try {
      const { email, password } = req.body;
      const emailCheck = await authModel.findBy("email", email);
      if (emailCheck.rowCount) {
        if (emailCheck.rows[0].level == 1) {
          if (emailCheck.rows[0].verify_code == "") {
            if (emailCheck.rows[0].is_active == 1) {
              bcrypt
                .compare(password, emailCheck.rows[0].password)
                .then(async (match) => {
                  if (match) {
                    const token = await jwtToken({
                      id: emailCheck.rows[0].id,
                      level: emailCheck.rows[0].level,
                    });
                    success(res, {
                      code: 200,
                      status: "success",
                      message: "login buyer success",
                      token: token,
                    });
                  } else {
                    failed(res, {
                      code: 400,
                      status: "error",
                      message: "wrong email or password",
                    });
                  }
                });
            } else {
              const err = {
                message: "your account is disabled, contact administrator",
              };
              failed(res, {
                code: 500,
                status: "error",
                message: err.message,
                error: [],
              });
              return;
            }
          } else {
            const err = {
              message: "account not verified by email",
            };
            failed(res, {
              code: 500,
              status: "error",
              message: err.message,
              error: [],
            });
            return;
          }
        } else {
          const err = {
            message: "your account not buyer account",
          };
          failed(res, {
            code: 500,
            status: "error",
            message: err.message,
            error: [],
          });
          return;
        }
      } else {
        const err = {
          message: "email is not registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
    } catch (error) {
      failed(res, {
        code: 500,
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  registerSeller: async (req, res) => {
    try {
      const { name, email, phone, storeName, password } = req.body;
      // return console.log(req.body);
      const emailCheck = await authModel.findBy("email", email);
      if (emailCheck.rowCount == 0) {
        const storeNameCheck = await sellerModel.findBy(
          "store_name",
          storeName
        );
        console.log(storeNameCheck);
        if (storeNameCheck.rowCount == 0) {
          // to table auth

          const authId = uuidv4();
          const level = 2;
          const isActive = false;
          const verifyToken = crypto.randomBytes(16).toString("hex");
          const passwordHashed = await bcrypt.hash(password, 10);
          const dataToAuth = {
            authId,
            email,
            passwordHashed,
            level,
            isActive,
            verifyToken,
          };
          await authModel.insertToAuth(dataToAuth);

          // to table seller

          const sellerId = uuidv4();
          const userId = authId;
          const photo = "user_default.png";
          const dataToSeller = {
            sellerId,
            userId,
            name,
            phone,
            storeName,
            photo,
          };
          await authModel.insertToSeller(dataToSeller);
          sendMail.sendConfirmationEmail(email, verifyToken, name);
          success(res, {
            code: 200,
            status: "success",
            message: "Register as seller success",
            data: {
              ...dataToAuth,
              ...dataToSeller,
            },
          });
        } else {
          const err = {
            message: "store name is already registered",
          };
          failed(res, {
            code: 500,
            status: "error",
            message: err.message,
            error: [],
          });
          return;
        }
      } else {
        const err = {
          message: "email is already registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
      return;
    }
  },
  loginSeller: async (req, res) => {
    try {
      const { email, password } = req.body;
      const emailCheck = await authModel.findBy("email", email);
      if (emailCheck.rowCount) {
        if (emailCheck.rows[0].level == 2) {
          if (emailCheck.rows[0].verify_code == "") {
            if (emailCheck.rows[0].is_active == 1) {
              bcrypt
                .compare(password, emailCheck.rows[0].password)
                .then(async (match) => {
                  if (match) {
                    const token = await jwtToken({
                      id: emailCheck.rows[0].id,
                      level: emailCheck.rows[0].level,
                    });
                    success(res, {
                      code: 200,
                      status: "success",
                      message: "login seller success",
                      token: token,
                    });
                  } else {
                    failed(res, {
                      code: 400,
                      status: "error",
                      message: "wrong email or password",
                    });
                  }
                });
            } else {
              const err = {
                message: "your account is disabled, contact administrator",
              };
              failed(res, {
                code: 500,
                status: "error",
                message: err.message,
                error: [],
              });
              return;
            }
          } else {
            const err = {
              message: "account not verified by email",
            };
            failed(res, {
              code: 500,
              status: "error",
              message: err.message,
              error: [],
            });
            return;
          }
        } else {
          const err = {
            message: "your account not seller account",
          };
          failed(res, {
            code: 500,
            status: "error",
            message: err.message,
            error: [],
          });
          return;
        }
      } else {
        const err = {
          message: "email is not registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
    } catch (error) {
      failed(res, {
        code: 500,
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const emailCheck = await authModel.findBy("email", email);
      // console.log(emailCheck.rowCount);
      if (emailCheck.rowCount) {
        if (emailCheck.rows[0].level == 0) {
          if (emailCheck.rows[0].verify_code == "") {
            if (emailCheck.rows[0].is_active == 1) {
              bcrypt
                .compare(password, emailCheck.rows[0].password)
                .then(async (match) => {
                  if (match) {
                    const token = await jwtToken({
                      id: emailCheck.rows[0].id,
                      level: emailCheck.rows[0].level,
                    });
                    success(res, {
                      code: 200,
                      status: "success",
                      message: "login admin success",
                      token: token,
                    });
                  } else {
                    failed(res, {
                      code: 400,
                      status: "error",
                      message: "wrong email or password",
                    });
                  }
                });
            } else {
              const err = {
                message: "your account is disabled, contact administrator",
              };
              failed(res, {
                code: 500,
                status: "error",
                message: err.message,
                error: [],
              });
              return;
            }
          } else {
            const err = {
              message: "account not verified by email",
            };
            failed(res, {
              code: 500,
              status: "error",
              message: err.message,
              error: [],
            });
            return;
          }
        } else {
          const err = {
            message: "your account not admin account",
          };
          failed(res, {
            code: 500,
            status: "error",
            message: err.message,
            error: [],
          });
          return;
        }
      } else {
        const err = {
          message: "email is not registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
    } catch (error) {
      failed(res, {
        code: 500,
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { token } = req.query;
      const verifyTokenCheck = await authModel.findBy("verify_code", token);
      if (verifyTokenCheck.rowCount > 0) {
        await authModel
          .verifyingUser(token)
          .then(() => {
            res.send(`
      <center>
      <div>
        <h1>Activation Success</h1>
      </div>
      </center>
        `);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const err = {
          message: "verify code is invalid",
        };
        failed(res, {
          code: 500,
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      const check = await authModel.findBy("id", id);
      if (check.rowCount == 1) {
        if (isActive == true && check.rows[0].is_active == true) {
          failed(res, {
            code: 500,
            status: "failed",
            message: `user with id ${id} already active`,
          });
        } else if (isActive == false && check.rows[0].is_active == false) {
          failed(res, {
            code: 500,
            status: "failed",
            message: `user with id ${id} already nonactive`,
          });
        } else {
          const data = { id, isActive };
          await authModel.updateStatus(data);
          const newData = await authModel.findBy("id", id);
          success(res, {
            code: 200,
            status: "success",
            message: "Success update status buyer",
            data: newData.rows[0],
          });
        }
      } else {
        failed(res, {
          code: 500,
          status: "failed",
          message: `user with id ${id} not found`,
        });
      }
    } catch (error) {
      // failed(res, {
      //   code: 500,
      //   status: "failed",
      //   message: error.message,
      // });
      console.log(error);
    }
  },
};
module.exports = authController;
