const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");
const validation = {
  checkToken: (req, res, next) => {
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    const token = req.cookies["token"];
    if (!token) {
      throw new errorHandler.Unauthorized("Acesso negado");
    }
    const secret = process.env.SECRET;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new errorHandler.Unauthorized("Acesso negado");
      }
      req.userId = decoded.id;
      next();
    });
  },
};

module.exports = validation;
