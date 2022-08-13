const transactionModel = require("../model/transaction.model");
const productModel = require("../model/product.model");
const { v4: uuidv4 } = require("uuid");
const { success, failed } = require("../helper/response");

const transactionController = {
  all: async (req, res) => {
    try {
      const result = await transactionModel.all();
      success(res, {
        code: 200,
        status: "success",
        message: "Success get all transaction",
        data: result.rows,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await transactionModel.detail(id);
      success(res, {
        code: 200,
        status: "success",
        message: "Success transaction",
        data: result.rows[0],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  insert: async (req, res) => {
    try {
      const { productId, productAmount } = req.body;
      const id = uuidv4();
      const productDetail = await productModel.detail(productId);

      if (productDetail.rowCount > 0) {
        if (productDetail.rows[0].stock >= productAmount) {
          // to reduce product stock
          const stockProductNow =
            productDetail.rows[0].stock - Number(productAmount);
          await productModel.updateStockProduct(productId, stockProductNow);

          // create new transaction
          const totalPayment = productAmount * productDetail.rows[0].price;
          const date = new Date();
          const dateOffset = new Date(
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
          );
          const createdAt = dateOffset.toISOString();
          const data = {
            id,
            productId,
            productAmount,
            totalPayment,
            createdAt,
          };
          await transactionModel.insert(data);
          success(res, {
            code: 200,
            status: "success",
            message: "Success create transaction",
            data: data,
          });
        } else {
          const error = {
            message: `product with id ${productId} has only ${productDetail.rows[0].stock} stock`,
          };
          failed(res, {
            code: 500,
            status: "error",
            message: error.message,
            error: [],
          });
        }
      } else {
        const error = {
          message: `product with id ${productId} not found`,
        };
        failed(res, {
          code: 500,
          status: "error",
          message: error.message,
          error: [],
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
};
module.exports = transactionController;
