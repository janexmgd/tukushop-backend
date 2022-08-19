const buyerModel = require("../model/buyer.model");
const { failed, success } = require("../helper/response");
const deleteFile = require("../helper/deleteFile");

const buyerController = {
  all: async (req, res) => {
    try {
      const { search, page, limit, sort, mode } = req.query;
      const searchQuery = search || "";
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : "name";
      const modeQuery = mode ? mode : "ASC";
      const allData = await buyerModel.allData();
      const totalData = allData.rows[0].total;

      const result = await buyerModel.all(
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
            message: "Success get all buyer",
            data: result.rows,
            pagination,
          });
        } else {
          const err = {
            message: `buyer with keyword ${search} not found`,
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
          message: `Success get all buyer`,
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
      const { id } = req.params;
      const result = await buyerModel.findBy("id", id);
      if (result.rowCount) {
        success(res, {
          code: 200,
          status: "success",
          message: "Success get buyer by id",
          data: result.rows[0],
        });
      } else {
        failed(res, {
          code: 500,
          status: "failed",
          message: "Failed to get data buyer",
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
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await buyerModel.findBy("id", id);
      if (result.rowCount) {
        const { name, phone, gender, birth } = req.body;
        let photo;
        if (req.file) {
          // non delete
          if (result.rows[0].photo == "user_default.png") {
            photo = req.file.filename;
            const data = {
              id,
              name,
              phone,
              gender,
              birth,
              photo,
            };
            await buyerModel.update(data);
            const newData = await buyerModel.findBy("id", id);
            success(res, {
              code: 200,
              status: "success",
              message: "Success update buyer",
              data: newData.rows[0],
            });
          } else {
            // delete file
            photo = req.file.filename;
            deleteFile(`public/${result.rows[0].photo}`);
            const data = {
              id,
              name,
              phone,
              gender,
              birth,
              photo,
            };
            await buyerModel.update(data);
            const newData = await buyerModel.findBy("id", id);
            success(res, {
              code: 200,
              status: "success",
              message: "Success update buyer",
              data: newData.rows[0],
            });
          }
        } else {
          // tanpa upload photo
          photo = result.rows[0].photo;
          const data = {
            id,
            name,
            phone,
            gender,
            birth,
            photo,
          };
          await buyerModel.update(data);
          const newData = await buyerModel.findBy("id", id);
          success(res, {
            code: 200,
            status: "success",
            message: "Success update buyer",
            data: newData.rows[0],
          });
        }
      } else {
        failed(res, {
          code: 500,
          status: "failed",
          message: "no buyer found",
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "failed",
        message: error.message,
      });
    }
  },
};

module.exports = buyerController;
