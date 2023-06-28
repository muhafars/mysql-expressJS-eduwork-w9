const router = require("express").Router();
const fs = require("fs");
const multer = require("multer");
const connection = require("../../config/mysql");
const upload = multer({ dest: "../../public/uploads" });
const path = require("path");
const usersController = require("./controller");

router.get("/user", usersController.index);

router.get("/user/:id", usersController.view);

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
