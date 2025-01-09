import ToSale from '../models/ToSale.js';
import Products from '../models/Products.js';

const getProducts = async (req, res) => {
    try{
        const toSales = await ToSale.findAll({ where: { deletedAt: null } });
        res.status(200).json({ toSales: toSales });
    }catch(error){
        res.status(400).json({ error: 'Error when recovering toSales' });
    }
}

const getProductById = async (req, res) => {

}

const createProduct = async (req, res) => {

}

const updateProduct = async (req, res) => {

}

const deleteProduct= async (req, res) => {

}

export default { getProducts, getProductById, createProduct, updateProduct, deleteProduct };