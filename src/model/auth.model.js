const db = require("../config/db");

const authModel = {
  findBy: (table, keyword) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM auth WHERE ${table}='${keyword}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  insertToAuth: (data) => {
    const { authId, email, passwordHashed, level, isActive, verifyToken } =
      data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO auth(id,email,password,level,is_active,verify_code) 
      VALUES ('${authId}','${email}','${passwordHashed}',${level},${isActive},'${verifyToken}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  insertToBuyer: (data) => {
    const { buyerId, userId, name, photo } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO buyer(id,user_id,name,photo) 
      VALUES ('${buyerId}','${userId}','${name}','${photo}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  insertToSeller: (data) => {
    const { sellerId, userId, name, phone, storeName, photo } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO seller(id,user_id,name,phone,store_name,photo) 
      VALUES ('${sellerId}','${userId}','${name}','${phone}','${storeName}','${photo}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  verifyingUser: (token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE auth SET verify_code='', is_active=true WHERE verify_code='${token}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateStatus: (data) => {
    const { isActive, id } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE auth SET is_active = ${isActive} WHERE id='${id}'`,
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
module.exports = authModel;
