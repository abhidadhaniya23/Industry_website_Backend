const mongoose = require("mongoose");
require("dotenv").config();

const MongoURI = `mongodb+srv://${process.env.MONGO_URI_USERNAME}:${process.env.MONGO_URI_PASSWORD}@cluster0.9ylsz.mongodb.net/UserDatabase?retryWrites=true&w=majority`;

// connection with mongoose
mongoose
  .connect(MongoURI)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.error("could not connect to db.", err));

// creating user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// create a userData named collection
const userData = mongoose.model("user", userSchema);

module.exports = userData;
