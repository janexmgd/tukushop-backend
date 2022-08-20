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
  update: (data) => {
    const { id, name, phone, storeName, storeDescription, photo } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE seller SET name='${name}',phone='${phone}',store_name='${storeName}',
        store_description='${storeDescription}',photo='${photo}' WHERE id='${id}'`,
        (err, res) => {
          if (err) {
            // reject(err);
            console.log(err);
          }
          resolve(res);
        }
      );
    });
  },
};
module.exports = sellerModel;
