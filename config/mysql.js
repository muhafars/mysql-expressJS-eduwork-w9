const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "muhafars",
  password: "1",
  database: "eduwork_cruds",
});

module.exports = connection;
