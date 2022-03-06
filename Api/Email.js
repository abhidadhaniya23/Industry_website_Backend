const express = require("express");
const emailData = require("../Model/Email");
const { check, validationResult } = require("express-validator");
const email = express.Router();

// check validation... (if !true => msg send)
const validator = [check("email", "Please include a valid email").isEmail()];

// admin view to show data from database
email.get("/getEmail", async (req, res) => {
  const Emails = await emailData.find();
  if (Emails.length === 0) {
    res.status(404).json({ Message: "No users are there." });
  } else {
    res.status(200).json(Emails);
  }
});

email.post("/email", validator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.errors });
  }

  const createEmail = async () => {
    const { email } = req.body;

    try {
      const emailDatas = new emailData({
        email,
      });

      await emailDatas.save();
      res.status(200).json(emailDatas);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  createEmail();
});

module.exports = email;
