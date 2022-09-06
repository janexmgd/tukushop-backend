const productModel = require('../model/product.model');
const categoryModel = require('../model/category.model');
const sellerModel = require('../model/seller.model');
const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helper/response');
const deleteFile = require('../helper/deleteFile');

const productController = {
  all: async (req, res) => {
    try {
      const { search, page, limit, sort, mode } = req.query;
      const searchQuery = search || '';
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : 'name';
      const modeQuery = mode ? mode : 'ASC';
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
            status: 'success',
            message: 'Success get all product',
            data: result.rows,
            pagination,
          });
        } else {
          const err = {
            message: `product with keyword ${search} not found`,
          };
          failed(res, {
            code: 500,
            status: 'error',
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
          status: 'success',
          message: `Success get all product`,
          data: result.rows,
          pagination,
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await productModel.detail(id);
      success(res, {
        code: 200,
        status: 'success',
        message: 'Success get product by id',
        data: result.rows[0],
      });
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: [],
      });
    }
  },
  insert: async (req, res) => {
    try {
      const { name, stock, price, isNew, description, categoryId } = req.body;
      const id = uuidv4();
      const seller = await sellerModel.findBy(
        'user_id',
        req.APP_DATA.tokenDecoded.id
      );
      const sellerId = seller.rows[0].id;
      if (req.file) {
        const photo = req.file.filename;
        const data = {
          id,
          name,
          stock,
          price,
          isNew,
          description,
          photo,
          categoryId,
          sellerId,
        };
        // return console.log(data);
        const cekCategoryId = await categoryModel.detail(categoryId);
        if (cekCategoryId.rowCount == 0) {
          const error = {
            message: `Category with id ${categoryId} not found`,
          };
          failed(res, {
            code: 403,
            status: 'error',
            message: error.message,
            error: [],
          });
          console.log(data);
        } else {
          const data = {
            id,
            name,
            stock,
            price,
            isNew,
            description,
            photo,
            categoryId,
            sellerId,
          };
          await productModel.insert(data);
          success(res, {
            code: 200,
            status: 'success',
            message: 'Success adding product',
            data: data,
          });
        }
      } else {
        failed(res, {
          code: 500,
          status: 'error',
          message: 'photo is required',
          error: [],
        });
        return;
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error di sini',
        message: error.message,
        error: [],
      });
      return;
      // res.json({
      //   data
      // })
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, stock, price, isNew, description, categoryId } = req.body;

      const cekCategoryId = await categoryModel.detail(categoryId);
      if (cekCategoryId.rowCount == 0) {
        const error = {
          message: `Category with id ${categoryId} not found`,
        };
        failed(res, {
          code: 403,
          status: 'error',
          message: error.message,
          error: [],
        });
      } else {
        const cekProduct = await productModel.detail(id);
        if (cekProduct.rowCount == 1) {
          let photo;
          if (req.file) {
            photo = req.file.filename;
            deleteFile(`public/${cekProduct.rows[0].photo}`);
            const data = {
              id,
              name,
              stock,
              price,
              isNew,
              description,
              photo,
              categoryId,
            };
            await productModel.update(data);
            const newData = await productModel.detail(id);
            success(res, {
              code: 200,
              status: 'success',
              message: 'Success update product',
              data: newData.rows[0],
            });
          } else {
            photo = cekProduct.rows[0].photo;
            const data = {
              id,
              name,
              stock,
              price,
              isNew,
              description,
              photo,
              categoryId,
            };
            await productModel.update(data);
            const newData = await productModel.detail(id);
            success(res, {
              code: 200,
              status: 'success',
              message: 'Success update product',
              data: newData.rows[0],
            });
          }
        } else {
          const error = {
            message: `Product with id ${id} not found`,
          };
          failed(res, {
            code: 403,
            status: 'error',
            message: error.message,
            error: [],
          });
        }
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
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
          status: 'success',
          message: `Success delete product with id ${id}`,
          data: [],
        });
      } else {
        failed(res, {
          code: 500,
          status: 'error',
          message: `Product with id ${id} not found`,
          error: [],
        });
        return;
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
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
        status: 'success',
        message: 'Success get all product and category join',
        data: result.rows,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
    }
  },
  getProductbyCategoryName: async (req, res) => {
    try {
      const { name } = req.params;
      // return console.log(name);
      const categoryCek = await categoryModel.findBy('name', name);
      if (categoryCek.rowCount > 0) {
        const categoryId = categoryCek.rows[0].id;
        const products = await productModel.findBy('category_id', categoryId);
        success(res, {
          code: 200,
          status: 'success',
          message: 'Success get product',
          data: products.rows,
        });
      } else {
        failed(res, {
          code: 500,
          status: 'error',
          message: 'no category found',
          error: [],
        });
      }
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: [],
      });
    }
  },
};

module.exports = productController;
