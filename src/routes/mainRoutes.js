// mainRoutes sets up the route for the /user, /category, /furniture and delegates the handling of requests
// to the corresponding modules.

const express = require("express");
const router = express.Router();

// Import the routes for user, furniture and category
// const categoryRoutes = require("./categoryRoutes");
// const furnitureRoutes = require("./furnitureRoutes");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
// Define the routes
router.use("/category", categoryRoutes);
// Sets up the "/user" route and specifies that it should use the userRoutes module for handling requests
router.use("/user", userRoutes);

module.exports = router;
