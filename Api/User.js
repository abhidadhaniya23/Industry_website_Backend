const express = require("express");
const User = require("../Model/User");
const { check, validationResult } = require("express-validator");
require("dotenv").config();
const user = express.Router();

// check validation... (if !true => msg send)
const validator = [check("name", "Name is invalid").not().isEmpty().isLength({ min: 4 }), check("contact", "Invalid Mobile Number.").isLength({ min: 10 }), check("email", "Please include a valid email").isEmail()];

// admin view to show data from database
user.get("/getData", async (req, res) => {
  const userData = await User.find();
  if (userData.length === 0) {
    res.status(404).json({ Message: "No users are there." });
  } else {
    res.status(200).json(userData);
  }
});

user.post("/register", validator, (req, res) => {
  // check if any validation is not true then send error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.errors });
  }

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
      res.status(400).json(userData);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  // call asynchronous create user FN.
  createUser();
});

module.exports = user;
