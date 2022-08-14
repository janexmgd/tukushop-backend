const transactionModel = require("../model/transaction.model");
const productModel = require("../model/product.model");
const { v4: uuidv4 } = require("uuid");
const { success, failed } = require("../helper/response");

const transactionController = {
  all: async (req, res) => {
    try {
      const { page, limit, sort, mode } = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : "created_at";
      const modeQuery = mode ? mode : "ASC";
      const allData = await transactionModel.totalData();

      const totalData = allData.rows[0].total;
      const result = await transactionModel.all(
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery
      );

      const pagination = {
        currentPage: pageValue,
        dataPerPage: limitValue,
        totalPage: Math.ceil(totalData / limitValue),
      };

      success(res, {
        code: 200,
        status: "success",
        message: `Success get transaction`,
        data: result.rows,
        pagination,
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
      if (result.rowCount > 0) {
        success(res, {
          code: 200,
          status: "success",
          message: "Success transaction",
          data: result.rows[0],
        });
      } else {
        failed(res, {
          code: 200,
          status: "success",
          message: `transaction with id ${id} not found`,
          data: result.rows[0],
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
  destroy: async (req, res) => {
    const { id } = req.params;
    const result = await transactionModel.destroy(id);
    if (result.rowCount > 0) {
      success(res, {
        code: 200,
        status: "success",
        message: `Success delete transaction with id ${id}`,
        data: [],
      });
    } else {
      failed(res, {
        code: 500,
        status: "error",
        message: `transaction with id ${id} not found`,
        error: [],
      });
      return;
    }
  },
  transactionProductCategory: async (req, res) => {
    try {
      const result = await transactionModel.transactionProductCategory();
      success(res, {
        code: 200,
        status: "success",
        message: `Success get transaction full detail`,
        data: result.rows,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: `${error.message}`,
        error: [],
      });
    }
  },
};
module.exports = transactionController;
