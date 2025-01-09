import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const SupplierUser = db.define('supplier', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    company_name: {
        type: DataTypes.STRING
    }
},
{
    timestamps: false,
    schema: 'scm_b2b',
    freezeTableName: true
}
);

export default SupplierUser;
