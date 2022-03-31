require("dotenv").config;
const client = require("./src/dbConnection");

const app = require("./src/app");

const port = process.env.PORT || 3004;

client
  .connect()
  .then((data) => {
    console.log("Conectado na base de dados");
    app.listen(port, () => console.log(`Ouvindo na porta ${port} ...`));
  })
  .catch((err) => {
    console.log(err);
  });
