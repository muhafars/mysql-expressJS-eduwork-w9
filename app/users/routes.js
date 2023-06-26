const router = require("express").Router;
const fs = require("fs");
const multer = require("multer");
const connection = require("../../config/mysql");
const upload = multer({ dest: "../../public/uploads" });
const path = require("path");

router.get("/", (req, res) => {
  connection.connect();
  connection.query(
    {
      sql: "SELECT * FROM users",
    },
    (err, result) => {
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
    }
  );
});

router.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
  });
});

router.post("/users", upload.single("image"), (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (!image) {
    const target = path.join(__dirname, "uploads", image.originalname);
    fs.renameSync(image.path, target);
    res.sendFile(target);
  }
});

module.exports = router;
