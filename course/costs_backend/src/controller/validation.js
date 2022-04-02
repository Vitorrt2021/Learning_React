const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validation = {
  checkToken: (req, res, next) => {
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ msg: "Acesso negado" });
    }
    const secret = process.env.SECRET;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "Acesso negado" });
        return false;
      }
      req.userId = decoded.id;
      next();
    });
  },
};

module.exports = validation;
