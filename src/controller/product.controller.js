const productModel = require("../model/product.model");
const categoryModel = require("../model/category.model");
const { v4: uuidv4 } = require("uuid");
const { success, failed } = require("../helper/response");

const productController = {
  all: async (req, res) => {
    try {
      const { search, page, limit, sort, mode } = req.query;
      const searchQuery = search || "";
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : "name";
      const modeQuery = mode ? mode : "ASC";
      const allData = await productModel.totalData();

      const totalData = allData.rows[0].total;
      const result = await productModel.all(
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery
      );
      if (search) {
        if (result.rowCount > 0) {
          const pagination = {
            currentPage: pageValue,
            dataPerPage: limitValue,
            totalPage: Math.ceil(result.rowCount / limitValue),
          };
          success(res, {
            code: 200,
            status: "success",
            message: "Success get all product",
            data: result.rows,
            pagination,
          });
        } else {
          const err = {
            message: `product with keyword ${search} not found`,
          };
          failed(res, {
            code: 500,
            status: "error",
            message: err.message,
            error: [],
          });
        }
      } else {
        const pagination = {
          currentPage: pageValue,
          dataPerPage: limitValue,
          totalPage: Math.ceil(totalData / limitValue),
        };

        success(res, {
          code: 200,
          status: "success",
          message: `Success get all product`,
          data: result.rows,
          pagination,
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
  detail: async (req, res) => {
    try {
      try {
        const { id } = req.params;
        const result = await productModel.detail(id);
        success(res, {
          code: 200,
          status: "success",
          message: "Success get product by id",
          data: result.rows[0],
        });
      } catch (err) {
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
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
      return;
    }
  },
  insert: async (req, res) => {
    try {
      const { name, stock, price, categoryId } = req.body;
      const id = uuidv4();
      const data = {
        id,
        name,
        stock,
        price,
        categoryId,
      };
      const cekCategoryId = await categoryModel.detail(categoryId);
      if (cekCategoryId.rowCount == 0) {
        const error = {
          message: `Category with id ${categoryId} not found`,
        };
        failed(res, {
          code: 403,
          status: "error",
          message: error.message,
          error: [],
        });
      } else {
        await productModel.insert(data);
        success(res, {
          code: 200,
          status: "success",
          message: "Success adding product",
          data: data,
        });
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
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, stock, price, categoryId } = req.body;
      const data = {
        id,
        name,
        stock,
        price,
        categoryId,
      };
      const cekCategoryId = await categoryModel.detail(categoryId);
      if (cekCategoryId.rowCount == 0) {
        const error = {
          message: `Category with id ${categoryId} not found`,
        };
        failed(res, {
          code: 403,
          status: "error",
          message: error.message,
          error: [],
        });
      } else {
        await productModel.update(data);
        success(res, {
          code: 200,
          status: "success",
          message: "Success update product",
          data: data,
        });
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
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await productModel.destroy(id);
      if (result.rowCount > 0) {
        success(res, {
          code: 200,
          status: "success",
          message: `Success delete product with id ${id}`,
          data: [],
        });
      } else {
        failed(res, {
          code: 500,
          status: "error",
          message: `Product with id ${id} not found`,
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
  productCategory: async (req, res) => {
    try {
      const result = await productModel.allProductCategory();
      success(res, {
        code: 200,
        status: "success",
        message: "Success get all product and category join",
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
};

module.exports = productController;
