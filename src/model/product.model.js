const db = require('../config/db');
const productModel = {
  totalData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total from products`, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  all: (searchQuery, offsetValue, limitValue, sortQuery, modeQuery) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *,seller.store_name FROM products 
        INNER JOIN seller ON products.seller_id=seller.id
        WHERE LOWER(products.name) LIKE '%${searchQuery}%' 
        ORDER BY products.${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}
      `,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  detail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  insert: (data) => {
    return new Promise((resolve, reject) => {
      const {
        id,
        name,
        stock,
        price,
        isNew,
        description,
        photo,
        categoryId,
        sellerId,
      } = data;
      db.query(
        `INSERT INTO products(id,seller_id,name,stock,price,category_id,is_new,description,photo) VALUES
        ('${id}','${sellerId}','${name}',${stock},${price},'${categoryId}','${isNew}','${description}','${photo}')`,
        (err, res) => {
          if (err) {
            reject(err);
            // console.log(err);
          }
          resolve(res);
        }
      );
    });
  },
  update: (data) => {
    return new Promise((resolve, reject) => {
      const { id, name, stock, price, isNew, description, photo, categoryId } =
        data;
      db.query(
        `UPDATE products SET name='${name}',stock=${stock},is_new=${isNew},description='${description}',photo='${photo}',
        price=${price},category_id='${categoryId}'         
        WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM products where id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  allProductCategory: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
        products.id,products.name AS productName,products.stock AS productStock,products.price AS productPrice,products.category_id,
        category.id AS categoryId,category.name AS categoryName FROM products INNER JOIN category ON products.category_id=category.id`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  updateStockProduct: (id, stock) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE products SET stock=${stock} WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  findBy: (table, keyword) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM product WHERE ${table}='${keyword}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = productModel;
