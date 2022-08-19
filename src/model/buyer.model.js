const db = require("../config/db");

const buyerModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total from buyer`, (err, res) => {
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
        `SELECT * FROM buyer WHERE LOWER(name) LIKE '%${searchQuery}%'
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
  update: (data) => {
    const { id, name, phone, gender, birth } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE buyer SET name='${name}',phone='${phone}',gender=${gender},birth='${birth}' WHERE id='${id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  findBy: (row, keyword) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM buyer WHERE ${row}='${keyword}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = buyerModel;
