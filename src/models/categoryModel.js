const pool = require("../services/db");

var categoryModel = {
  // Used to retrieve all users from the database
  getAllCategory: (callback) => {
    //code...
    const SQLSTATMENT = `
        SELECT * FROM category;
    `;

    pool.query(SQLSTATMENT, callback);
  },
  // Used to create new category into the database
  createNewCategory: (data, callback) => {
    //code...
    const SQLSTATMENT = `
        INSERT INTO category (name, description)
        VALUES (?,?);
    `;
    const VALUES = [data.name, data.description];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  getFurnitureByCategory: (categoryId, callback) => {
    const SQLSTATEMENT = `
      SELECT
        f.fid,
        f.name,
        f.description,
        f.price,
        f.quantity,
        c.catid,
        c.name AS catName
      FROM
        furniture f
      JOIN
        category c ON f.catid = c.catid
      WHERE
        c.catid = ?;
    `;

    const VALUES = [categoryId];

    pool.query(SQLSTATEMENT, VALUES, callback);
  },
};

module.exports = categoryModel;
