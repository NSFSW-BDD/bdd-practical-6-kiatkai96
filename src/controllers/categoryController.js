// Step 1: Import the model module
const categoryModel = require("../models/categoryModel");

var categoryController = {
  getAllCategory: (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error getAllCategory:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };

    categoryModel.getAllCategory(callback);
  },
  createNewCategory: (req, res, next) => {
    const data = {
      catid: req.body.catid,
      name: req.body.name,
      description: req.body.description,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error createNewCategory:", error);
        res.status(500).json(error);
      } else {
        res.status(201).json(results);
      }
    };

    categoryModel.createNewCategory(data, callback);
  },

  getFurnitureByCategory: (req, res) => {
    const categoryId = req.params.categoryId;

    const callback = (error, results) => {
      if (error) {
        console.error("Error getFurnitureByCategory:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (results.length == 0) {
          res
            .status(404)
            .json({ message: "No furniture found for this category" });
        } else {
          res.status(200).json(results);
        }
      }
    };

    categoryModel.getFurnitureByCategory(categoryId, callback);
  },
};

module.exports = categoryController;
