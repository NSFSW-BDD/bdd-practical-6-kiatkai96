const pool = require("../services/db");

var userModel = {
  // Used to retrieve all users from the database
  getAllUser: (callback) => {
    //code...
    const SQLSTATMENT = `
        SELECT * FROM user;
    `;

    pool.query(SQLSTATMENT, callback);
  },

  // Used to retrieve a user by their ID from the database
  getUserById: (data, callback) => {
    //code...
    const SQLSTATMENT = `
        SELECT * FROM user
        WHERE userid = ?;
    `;
    const VALUES = [data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  // Used to insert new user into the database
  createNewUser: (data, callback) => {
    //code...
    const SQLSTATMENT = `
        INSERT INTO user (username, email,role,password)
        VALUES (?,?,?,?);
    `;
    const VALUES = [data.username, data.email, data.role, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  // Used to update a user's information in the database.
  updateUserById: (data, callback) => {
    //code...
    const SQLSTATMENT = `
        UPDATE user
        SET email=?
        WHERE userid=?;
    `;
    const VALUES = [data.email, data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  // used to delete a user from the database
  deleteUserById: (data, callback) => {
    //code...
    const SQLSTATMENT = `
        DELETE FROM user
        WHERE userid = ?
    `;
    const VALUES = [data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  // To login a user verification
  loginUser: (data, callback) => {
    const SQLSTATMENT = `select * from user where email=? and password=?`;

    const VALUES = [data.email, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
};

module.exports = userModel;
