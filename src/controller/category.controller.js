const categoryModel = require("../model/category.model");
const { v4: uuidv4 } = require("uuid");
const { success, failed } = require("../helper/response");

const categoryController = {
  all: async (req, res) => {
    try {
      const { search, page, limit, sort, mode } = req.query;
      const searchQuery = search || "";
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : "name";
      const modeQuery = mode ? mode : "ASC";
      const allData = await categoryModel.totalData();

      const totalData = allData.rows[0].total;
      const result = await categoryModel.all(
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
            message: "Success get all category",
            data: result.rows,
            pagination,
          });
        } else {
          const err = {
            message: `category with query ${search} not found`,
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
          message: `Success get all category`,
          data: result.rows,
          pagination,
        });
      }
    } catch (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: err.message,
        error: [],
      });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await categoryModel.detail(id);
      if (result.rowCount > 0) {
        success(res, {
          code: 200,
          status: "success",
          message: "Success get category by id",
          data: result.rows[0],
        });
      } else {
        failed(res, {
          code: 500,
          status: "success",
          message: `category with id ${id} not found`,
          data: result.rows[0],
        });
      }
    } catch (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: err.message,
        error: [],
      });
    }
  },
  insert: async (req, res) => {
    try {
      const { name } = req.body;
      const id = uuidv4();
      const data = { id, name };
      await categoryModel.insert(data);
      success(res, {
        code: 200,
        status: "success",
        message: "Success adding category",
        data: data,
      });
    } catch (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: err.message,
        error: [],
      });
      return;
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const data = { id, name };
      const result = await categoryModel.update(data);
      if (result.rowCount > 0) {
        success(res, {
          code: 200,
          status: "success",
          message: "Success update category",
          data: data,
        });
      } else {
        failed(res, {
          code: 500,
          status: "success",
          message: `category with id ${id} not found`,
          data: data,
        });
      }
    } catch (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: err.message,
        error: [],
      });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await categoryModel.destroy(id);
      if (result.rowCount > 0) {
        success(res, {
          code: 200,
          status: "success",
          message: `Success delete category with id ${id}`,
          data: [],
        });
      } else {
        failed(res, {
          code: 500,
          status: "error",
          message: `category with id ${id} not found`,
          error: [],
        });
      }
    } catch (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: err.message,
        error: [],
      });
    }
  },
};

module.exports = categoryController;
