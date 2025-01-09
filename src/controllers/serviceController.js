import ToSale from '../models/ToSale.js';
import Services from '../models/Services.js';

const getServices = async (req, res) => {
    try{
        const toSales = await ToSale.findAll({ where: { deletedAt: null } });
        res.status(200).json({ toSales: toSales });
    }catch(error){
        res.status(400).json({ error: 'Error when recovering toSales' });
    }
}

const getServiceById = async (req, res) => {

}

const createService = async (req, res) => {

}

const updateService = async (req, res) => {

}

const deleteService= async (req, res) => {

}

export default { getServices, getServiceById, createService, updateService, deleteService };