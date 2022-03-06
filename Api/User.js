const express = require("express");
const User = require("../Model/User");
// const { check, validationResult } = require("express-validator");
require("dotenv").config();
const user = express.Router();

// check validation... (if !true => msg send)
// const validator = [check("name", "Name is invalid").not().isEmpty().isLength({ min: 4 }), check("contact", "Invalid Mobile Number.").isLength({ min: 10 }), check("email", "Please include a valid email").isEmail()];

// admin view to show data from database
user.get("/getData", async (req, res) => {
  let limit = req.query.limit;
  if (req.query.limit === undefined) {
    limit = 500;
  }
  // limit = req.query.limit;
  switch (req.query.sort) {
    case "nameA":
      const ascendingName = await User.find().sort({ name: 1 }).limit(limit);
      res.status(200).json(ascendingName);
      break;
    case "nameD":
      const descendingName = await User.find().sort({ name: -1 }).limit(limit);
      res.status(200).json(descendingName);
      break;
    case "message":
      const message = await User.find().sort({ message: 1 }).limit(limit);
      res.status(200).json(message);
      break;
    case "ascending":
      const ascending = await User.find().sort({ created: 1 }).limit(limit);
      res.status(200).json(ascending);
      break;
    default:
      // Ascending Order
      const userData = await User.find().sort({ created: -1 }).limit(limit);
      if (userData.length === 0) {
        res.status(404).json({ Message: "No users are there." });
      } else {
        res.status(200).json(userData);
      }
      break;
  }
});

// limited responses
/* user.get("/getData/:limit", async (req, res) => {
  const limitedUsers = await User.find().limit(req.params.limit).sort({ created: -1 });
  res.status(200).json(limitedUsers);
}); */

// Sorting in ascending order

user.post("/register", (req, res) => {
  // check if any validation is not true then send error
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json({ error: errors.errors });
  // }

  // creating user to send message to server
  const createUser = async () => {
    // getting all data from req. using destructuring array
    const { name, email, contact, message } = req.body;

    // if any error occurred then catch
    try {
      // set all new data for user to store in database
      const userData = new User({
        name,
        email,
        contact,
        message,
      });

      // everything okay, save user in database
      await userData.save();
      res.status(200).json(userData);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  // call asynchronous create user FN.
  createUser();
});

module.exports = user;
