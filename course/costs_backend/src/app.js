require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/userRoutes.js");
const projectRoutes = require("./routes/projectRoutes.js");
const serviceRoutes = require("./routes/serviceRoutes.js");

const client = require("./dbConnection");
//Middleware

app.use(cors());
app.use(express.json());

//Routes
app.use("/users/", userRoutes);
app.use("/projects/", projectRoutes);
app.use("/services/", serviceRoutes);

module.exports = app;
