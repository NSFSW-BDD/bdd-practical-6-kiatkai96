// Step 1: Import the required modules and create a router object
const express = require("express");
const router = express.Router();

// Step 2: Import the userController module
const controller = require("../controllers/categoryController");

router.get("/", controller.getAllCategory);
router.post("/", controller.createNewCategory);

// Task 2: Define the route to get furniture by category ID
router.get("/:categoryId/furniture", controller.getFurnitureByCategory);

console.log(controller);

// Step 4: Export the router object
module.exports = router;
