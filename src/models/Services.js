import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Products = db.define('toSale', {
    toSale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    service_time: {
        type: DataTypes.TIME
    },
    nb_providers: {
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
