const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const connection = require("../../config/mysql");
const upload = multer({ dest: "../../public/uploads" });

router.get("/product", (req, res) => {
  connection.connect();
  connection.query(
    {
      sql: "SELECT * FROM products",
    },
    (err, result) => {
      if (err) {
        console.error(err);
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
    }
  );
});

router.get("/products/:id", (req, res) => {
  res.json({
    id: req.params.id,
  });
});

router.post("/product", upload.single("image"), (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (!image) {
    const target = path.join(__dirname, "uploads", image.originalname);
    fs.renameSync(image.path, target);
    res.sendFile(target);
  }
});

module.exports = router;
