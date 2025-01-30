import ToSales from "../models/ToSales.js";
import Products from "../models/Products.js";

const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    const detailledProduct = await Promise.all(
      products.map(async (product) => {
        const toSale = await ToSales.findByPk(product.toSale_id, {
          where: { deletedAt: null },
        });
        return { product, toSale };
      }),
    );
    res.status(200).json({ products: detailledProduct });
  } catch (error) {
    res.status(400).json({ error: "Error when recovering products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else if (product.deletedAt != null) {
      res.status(404).json({ error: "Product not found" });
    } else {
      const toSale = await ToSales.findByPk(product.toSale_id);
      res.status(200).json({ product, toSale });
    }
  } catch (error) {
    res.status(400).json({ error: "Error when recovering product" });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      HT_price,
      TTC_price,
      margin,
      selling_price,
      category,
      brand,
      weight,
      nb_soldBy,
      nb_stock,
      user_id_supplier,
    } = req.body;
    const toSale = await ToSales.create({
      name,
      description,
      image,
      HT_price,
      TTC_price,
      margin,
      selling_price,
    });
    const product = await Products.create({
      category,
      brand,
      weight,
      nb_soldBy,
      nb_stock,
      user_id_supplier,
      toSale_id: toSale.toSale_id,
    });
    res.status(201).json({ product, toSale });
  } catch (error) {
    res.status(400).json({ error: "Error when creating product" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else if (product.deletedAt != null) {
      res.status(404).json({ error: "Product not found" });
    } else {
      const {
        name,
        description,
        image,
        HT_price,
        TTC_price,
        margin,
        selling_price,
        category,
        brand,
        weight,
        nb_soldBy,
        nb_stock,
        user_id_supplier,
      } = req.body;
      const toSale = await ToSales.findByPk(product.toSale_id);
      await toSale.update({
        name,
        description,
        image,
        HT_price,
        TTC_price,
        margin,
        selling_price,
      });
      await product.update({
        category,
        brand,
        weight,
        nb_soldBy,
        nb_stock,
        user_id_supplier,
      });
      res.status(200).json({ product, toSale });
    }
  } catch (error) {
    res.status(400).json({ error: "Error when updating product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const toSale = await ToSales.findByPk(id);
    if (!toSale) {
      res.status(404).json({ error: "Product not found" });
    } else if (toSale.deletedAt != null) {
      res.status(404).json({ error: "Product not found" });
    } else {
      await toSale.update({ deletedAt: new Date() });
      res.status(204).json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error when deleting product" });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
