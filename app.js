const express = require("express");
const logger = require("morgan");
const path = require("path");
const app = express();
// - router
const productRouter = require("./app/product/routes");
const usersRouter = require("./app/users/routes");
const productsRouterV2 = require("./app/product-v2/routes");

const PORT = process.env.PORT ? process.env.PORT : 3001;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public/uploads")));
app.use("/api/v1", productRouter, usersRouter);
app.use("/api/v2", productsRouterV2);

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
