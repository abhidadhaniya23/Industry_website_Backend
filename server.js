const express = require("express");
const app = express();
const user = require("./Api/User");
const email = require("./Api/Email");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const checkApi = () => {
    return (req, res, next) => {
        if (req.query.ApiKey === process.env.API_KEY) {
            next();
        } else {
            res.status(401).json({ msg: "Unauthorized" });
        }
    };
};

// middleware to get parsed json data from request
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", checkApi());
app.use("/api/user", user);
app.use("/api/subscribe", email);

app.get("/", (req, res) => {
    res.status(200).send("Done");
});

app.listen(PORT, () => {
    console.log(`The app is running at ${PORT}`);
});
