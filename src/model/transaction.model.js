const db = require("../config/db");

const transactionModel = {
  totalData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total from transaction`, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  all: (offsetValue, limitValue, sortQuery, modeQuery) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM transaction ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}
      `,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
          // console.log(result);
        }
      );
    });
  },
  detail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM transaction WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  insert: (data) => {
    return new Promise((resolve, reject) => {
      const { id, productId, productAmount, createdAt, totalPayment } = data;
      db.query(
        `INSERT INTO transaction(id,product_id,product_amount,total_payment,created_at)
    VALUES ('${id}','${productId}',${productAmount},${totalPayment},'${createdAt}')
    `,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM transaction WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  transactionProductCategory: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT
        transaction.id AS transactionId,transaction.product_id AS transactionProducId,
        transaction.product_amount AS transactionProductAmount,
        transaction.total_payment AS transactionTotalPayment,
        transaction.created_at AS transactionCreatedAt,
        products.id,products.name AS productName,products.stock AS productStock,
        products.price AS productPrice,products.category_id,
        category.id AS categoryId,category.name AS categoryName
        from transaction
      INNER JOIN products ON transaction.product_id = products.id
      INNER JOIN category ON products.category_id = category.id
      `,
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

module.exports = transactionModel;
