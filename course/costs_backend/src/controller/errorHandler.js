class InternalServerError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

const controller = (req, res) => {
  throw new InternalServerError("erro ss");
};

// 401 sem autorização

module.exports = {
  InternalServerError,
};
