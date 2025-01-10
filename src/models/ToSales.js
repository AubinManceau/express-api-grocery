import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const ToSale = db.define('toSale', {
    toSale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    HT_price: {
        type: DataTypes.FLOAT
    },
    TTC_price: {
        type: DataTypes.FLOAT
    },
    margin: {
        type: DataTypes.FLOAT
    },
    sellingPrice: {
        type: DataTypes.FLOAT
    },
    deletedAt: {
        type: DataTypes.DATE
    }
},
{
    timestamps: false,
    schema: 'scm_toSale',
    freezeTableName: true
}
);

export default ToSale;
