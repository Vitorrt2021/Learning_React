require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/userRoutes.js");

const client = require("./dbConnection");
//Middleware

app.use(cors());
app.use(express.json());

//Routes
app.use("/user/", userRoutes);

module.exports = app;
