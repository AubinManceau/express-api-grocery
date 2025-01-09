import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Products = db.define('toSale', {
    toSale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING
    },
    brand: {
        type: DataTypes.STRING
    },
    weight: {
        type: DataTypes.FLOAT
    },
    nb_soldBy: {
        type: DataTypes.INTEGER
    },
    nb_stock: {
        type: DataTypes.INTEGER
    },
    user_id_supplier: {
        type: DataTypes.INTEGER
    }
},
{
    timestamps: false,
    schema: 'scm_toSale',
    freezeTableName: true
}
);

export default Products;
