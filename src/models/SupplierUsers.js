import { DataTypes } from 'sequelize';
import User from './Users.js';
import db from '../config/database.js';

const SupplierUser = db.define('supplier', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'user_id'
        }
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

SupplierUser.belongsTo(User, { foreignKey: 'user_id' });

export default SupplierUser;
