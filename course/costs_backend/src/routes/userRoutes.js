require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  getUsers,
  getUser,
  getByEmail,
  insertUserDB,
} = require("../model/users");
const { checkToken } = require("../controller/validation");
const errorHandler = require("../controller/errorHandler");

const router = require("express").Router();

router.get("/", checkToken, async (req, res) => {
  res.json(await getUsers());
});

router.get("/isconnect", checkToken, (req, res) => {
  res.json({ message: "Is connect", result: true });
});

router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
    throw new errorHandler.BadRequest("Falta dados");
  }
  //Encrypt password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const id = await insertUserDB(email, passwordHash, first_name, last_name);
  const user = await getUser(id);

  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = await getByEmail(email);
  if (users.length === 0) {
    throw new errorHandler.NotFound("Usuário não encontrado");
  }

  const user = users[0];

  //check if password match
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new errorHandler.BadRequest("Senha invalida");
  }

  const secret = process.env.SECRET;
  const token = jwt.sign(
    {
      id: user.id,
    },
    secret,
    {
      expiresIn: 600,
    }
  );
  res.cookie("token", token, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: "Logado com sucesso" });
});

module.exports = router;
