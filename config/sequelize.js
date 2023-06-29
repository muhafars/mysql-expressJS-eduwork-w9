const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "eduwork_cruds_v2",
  hostname: "localhost",
  username: "muhafars",
  password: "1",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established");
  } catch (error) {
    console.log("Unable to connect to database:", error);
  }
})();
module.exports = sequelize;
