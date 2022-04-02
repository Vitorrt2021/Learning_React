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

const router = require("express").Router();

router.get("/", checkToken, async (req, res) => {
  res.json(await getUsers());
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    //Encrypt password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const id = await insertUserDB(email, passwordHash, first_name, last_name);
    const user = await getUser(id);

    res.json(user);
  } catch {
    (e) => {
      console.log(err);
      res.json({ message: "error" });
    };
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await getByEmail(email);
    if (users.length === 0) {
      return res.status(404).json({ msg: "Usuario não encontrado" });
    }

    const user = users[0];

    //check if password match
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(422).json({ msg: "senha invalida" });
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
    res.status(200).json({ msg: "Logado com sucesso" });
  } catch {
    (e) => {
      console.log(e);
      res.send({ msg: "Error" });
    };
  }
});

module.exports = router;
