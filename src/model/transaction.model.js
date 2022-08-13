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
};

module.exports = transactionModel;
