const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const connection = require("../../config/mysql");
const upload = multer({ dest: "../../public/uploads" });
const productController = require("./controller");

router.get("/product", productController.index);
router.get("/product/:id", productController.view);

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
