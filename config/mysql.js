const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "muhafars",
  password: "1",
  database: "eduwork_cruds",
  authPlugins: {
    password: "1",
  },
});

module.exports = connection;
