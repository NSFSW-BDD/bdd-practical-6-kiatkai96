const express = require("express");
const controller = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const router = express.Router();

// Step 3: Define the routes and associate them with the corresponding controller functions
//create your routes eg router.get('/', controller.readAllUser);
// GET request to / calls the getAllUser function from the userController
router.get(
  "/",
  jwtMiddleware.verifyToken,
  jwtMiddleware.verifyAdmin,
  userController.getAllUser
);
// POST request to / calls the createNewUser function from the userController
router.post("/", controller.createNewUser);
// GET request to /:userid calls the readUserById function from the userController,
// where :userid is a route parameter representing the user's ID
router.get("/:userid", controller.getUserById);
router.put("/:userid", controller.updateUserById);
router.delete("/:userid", controller.deleteUserById);
// To create a JWT and issue to use thats why use post
router.post(
  "/login",
  controller.loginUser,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);

// Step 4: Export the router object
module.exports = router;
