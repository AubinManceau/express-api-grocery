import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import SupplierUser from './SupplierUsers.js';
import ToSale from './ToSales.js';

const Product = db.define('products', {
    toSale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: ToSale,
            key: 'toSale_id'
        }
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
        type: DataTypes.INTEGER,
        references: {
            model: SupplierUser,
            key: 'user_id'
        }
    }
},
{
    timestamps: false,
    schema: 'scm_toSale',
    freezeTableName: true
}
);

Product.belongsTo(SupplierUser, { foreignKey: 'user_id_supplier' });
ToSale.hasOne(Product, { foreignKey: 'toSale_id' });

export default Product;
