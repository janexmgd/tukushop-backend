const db = require("../config/db");
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
        `SELECT * FROM products WHERE LOWER(name) LIKE '%${searchQuery}%'
      ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}
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
      const { id, name, stock, price, categoryId } = data;
      db.query(
        `INSERT INTO products(id,name,stock,price,category_id) VALUES
        ('${id}','${name}',${stock},${price},'${categoryId}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  update: (data) => {
    return new Promise((resolve, reject) => {
      const { id, name, stock, price, categoryId } = data;
      db.query(
        `UPDATE products SET name='${name}',stock=${stock},
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
};

module.exports = productModel;
