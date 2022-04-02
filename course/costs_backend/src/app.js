require("dotenv").config();

require("express-async-errors");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const userRoutes = require("./routes/userRoutes.js");
const projectRoutes = require("./routes/projectRoutes.js");
const serviceRoutes = require("./routes/serviceRoutes.js");

const client = require("./dbConnection");
//Middleware

app.use(cookieParser());
app.use(cors());
app.use(express.json());

//Routes
app.use("/users/", userRoutes);
app.use("/projects/", projectRoutes);
app.use("/services/", serviceRoutes);

app.use((error, req, res, next) => {
  if (error && error.statusCode) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(200).json({
      statusCode: 500,
      message: "InternalServerError",
    });
  }
});

module.exports = app;
