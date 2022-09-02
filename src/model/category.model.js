const db = require('../config/db');

const categoryModel = {
  totalData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM category`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  all: (searchQuery, offsetValue, limitValue, sortQuery, modeQuery) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM category WHERE LOWER(name) LIKE LOWER('%${searchQuery}%') 
        ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  findBy: (table, keyword) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM category WHERE ${table}='${keyword}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  detail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM category WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  insert: (data) => {
    return new Promise((resolve, reject) => {
      const { id, name, photo } = data;
      db.query(
        `INSERT INTO category (id,name,photo) VALUES ('${id}','${name}','${photo}')`,
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
    return new Promise((resolve, reject) => {
      const { id, name } = data;
      db.query(
        `UPDATE category SET name='${name}' WHERE id='${id}'`,
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
      db.query(`DELETE FROM category where id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
module.exports = categoryModel;
