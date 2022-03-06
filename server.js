const express = require("express");
const app = express();
const user = require("./Api/User");
const email = require("./Api/Email");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware to get parsed json data from request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", user);
app.use("/api/subscribe", email);

app.get("/", (req, res) => {
  res.send("Done");
});

app.listen(PORT, () => {
  console.log(`Your app is running at ${PORT}`);
});
