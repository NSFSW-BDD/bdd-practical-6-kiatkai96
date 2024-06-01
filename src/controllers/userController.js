// Step 1: Import the model module
const userModel = require("../models/userModel");

// Step 2: Implement the getAllUser function
// This function is responsible for retrieving all user data from the database
// It calls the selectAll function from the userModel.js module and returns the results as a JSON response
// If an error occurs, it sends a 500 status code and returns the error
var userController = {
  getAllUser: (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error getAllUser:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };

    userModel.getAllUser(callback);
  },

  // Step 3: Implement the getUserById function inside the userController after the readAllUser function
  // This function retrieves a specific user's data by their userid.
  // It extracts the userid from the request parameters and calls the getUserById function from the userModel.js module with the userid as an argument.
  // If the user is found, it returns their data as a JSON response with a 200 status code.
  // If the user is not found, it sends a 404 status code with a message indicating that the user was not found.
  getUserById: (req, res, next) => {
    const data = {
      userid: req.params.userid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error getUserById:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(200).json(results[0]);
      }
    };

    userModel.getUserById(data, callback);
  },

  // STEP 4: Implement the createNewUser function
  // This function is used to create a new user entry in the database.
  //It creates a new user entry using the insertSingle function from the userModel.js module and
  // returns the result as a JSON response with a 201 status code.
  createNewUser: (req, res, next) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error createNewUser:", error);
        res.status(500).json(error);
      } else {
        res.status(201).json(results);
      }
    };

    userModel.createNewUser(data, callback);
  },

  // Step 5: Implement the updateUserById function
  // This function is responsible for updating a user's information based on their ID.
  // It extracts the ID, username, and email from the request parameters and body and calls the updateUserById function from the userModel.js module to update the user's information.
  // If the useris found and successfully updated, it sends a 204 status code (No Content).
  // If the user is not found, it sends a 404 status code with a message indicating that the user was not found.
  updateUserById: (req, res, next) => {
    const data = {
      userid: req.params.userid,
      username: req.body.username,
      email: req.body.email,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error updateUserById:", error);
        res.status(500).json(error);
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(204).send(); // 204 No Content
      }
    };

    userModel.updateUserById(data, callback);
  },

  // Step 6: Implement the deleteUserById function
  // This function is used to delete a user from the database based on their ID.
  // It extracts the user ID from the request parameters and calls the deleteUserById function from the userModel.js module.
  // If the user is found and successfully deleted, it sends a 204 status code (No Content).
  // If the user is not found, it sends a 404 status code with a message indicating that the player was not found.
  deleteUserById: (req, res, next) => {
    const data = {
      userid: req.params.userid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error deleteUserById:", error);
        res.status(500).json(error);
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(204).send(); // 204 No Content
      }
    };

    userModel.deleteUserById(data, callback);
  },

  // To login user
  loginUser: (req, res, next) => {
    const data = {
      email: req.body.email,

      password: req.body.password,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error Login:", error);

        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          //no match

          res.status(404).json({
            message: "email/password wrong",
          });
        } else {
          //match email and password

          res.locals.userid = results[0].userid; //saves userid from database in res.locals for use in jwt payload

          res.locals.role = results[0].role; //saves role from database in res.locals for use in jwt payload

          next(); //call next middleware to issue token
        }
      }
    };

    userModel.loginUser(data, callback);
  },

  verifyAdmin: (req, res, next) => {
    if (res.locals.role == "admin") {
      next();
    } else {
      return res.status(401).json({ error: "Invalid Access Role" });
    }
  },
};

module.exports = userController;
