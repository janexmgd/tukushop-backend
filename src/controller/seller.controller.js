const sellerModel = require("../model/seller.model");
const { success, failed } = require("../helper/response");
const deleteFile = require("../helper/deleteFile");

const sellerController = {
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
