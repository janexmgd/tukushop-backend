const sellerModel = require("../model/seller.model");
const { success, failed } = require("../helper/response");
const deleteFile = require("../helper/deleteFile");

const sellerController = {
  all: async (req, res) => {
    try {
      const { search, page, limit, sort, mode } = req.query;
      const searchQuery = search || "";
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : "name";
      const modeQuery = mode ? mode : "ASC";
      const allData = await sellerModel.allData();
      const totalData = allData.rows[0].total;

      const result = await sellerModel.all(
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
            message: "Success get all seller",
            data: result.rows,
            pagination,
          });
        } else {
          const err = {
            message: `seller with keyword ${search} not found`,
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
          message: `Success get all seller`,
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
      const result = await sellerModel.findBy("id", id);
      if (result.rowCount) {
        success(res, {
          code: 200,
          status: "success",
          message: "Success get seller by id",
          data: result.rows[0],
        });
      } else {
        failed(res, {
          code: 500,
          status: "failed",
          message: "Failed to get data seller",
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
      const result = await sellerModel.findBy("id", id);
      if (result.rowCount) {
        const { name, phone, storeName, storeDescription } = req.body;
        let photo;
        if (req.file) {
          // non delete
          if (result.rows[0].photo == "user_default.png") {
            photo = req.file.filename;
            const data = {
              id,
              name,
              phone,
              storeName,
              storeDescription,
              photo,
            };
            await sellerModel.update(data);
            const newData = await sellerModel.findBy("id", id);
            success(res, {
              code: 200,
              status: "success",
              message: "Success update seller",
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
              storeName,
              storeDescription,
              photo,
            };
            await sellerModel.update(data);
            const newData = await sellerModel.findBy("id", id);
            success(res, {
              code: 200,
              status: "success",
              message: "Success update seller",
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
            storeName,
            storeDescription,
            photo,
          };
          await sellerModel.update(data);
          const newData = await sellerModel.findBy("id", id);
          success(res, {
            code: 200,
            status: "success",
            message: "Success update seller",
            data: newData.rows[0],
          });
        }
      } else {
        failed(res, {
          code: 500,
          status: "failed",
          message: "no seller found",
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

module.exports = sellerController;
