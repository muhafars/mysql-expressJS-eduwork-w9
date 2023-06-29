const Product = require("./model");
const path = require("path");
const fs = require("fs");
const Op = require("sequelize").Op;

const view = async (req, res) => {
  try {
    await Product.sync();
    const result = await Product.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
const index = async function (req, res) {
  const { search } = req.query;

  try {
    let results;
    if (search) {
      results = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    } else {
      results = await Product.findAll();
    }

    return res.send(results);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: id,
      },
    });

    if (deletedProduct === 0) {
      return res.status(404).send("Product not found.");
    }

    return res.send(`Product with ID ${id} has been deleted.`);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../public/uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3001/public/${image.originalname}`,
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;

  try {
    let updatedProductData = {
      name,
      price,
      stock,
      status,
    };

    if (image) {
      const target = path.join(__dirname, "../../public/uploads", image.originalname);
      fs.renameSync(image.path, target);
      updatedProductData.image_url = `http://localhost:3001/public/${image.originalname}`;
    }

    const [affectedRows] = await Product.update(updatedProductData, {
      where: {
        id: id,
      },
    });

    if (affectedRows === 0) {
      return res.status(404).send("Product not found.");
    }

    return res.send(`Product with ID ${id} has been updated.`);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

module.exports = { index, view, store, update, destroy };
