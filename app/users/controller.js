const connection = require("../../config/mysql");

const index = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM users",
    },
    _response(res)
  );
};

const view = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM users WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const store = (req, res) => {
  const { nama, email, alamat } = req.body;
  connection.query(
    {
      sql: "INSERT INTO users (nama, email, alamat) VALUES (?, ?,?)",
      values: [nama, email, alamat],
    },
    _response(res)
  );
};
const _response = res => {
  return (err, result) => {
    if (err) {
      res.send({
        status: "error",
        response: "failed to connect to database",
      });
    } else {
      res.send({
        status: "success",
        response: result,
      });
    }
  };
};

module.exports = { index, view, store };
