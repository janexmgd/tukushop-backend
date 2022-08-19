const db = require("../config/db");

const sellerModel = {
  findBy: (table, keyword) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM seller WHERE ${table}='${keyword}'`,
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
module.exports = sellerModel;
