import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import User from './Users.js';

const AdminUser = db.define('admin', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'user_id'
        }
    }
},
{
    timestamps: false,
    schema: 'scm_global',
    freezeTableName: true
}
);

AdminUser.belongsTo(User, { foreignKey: 'user_id' });

export default AdminUser;
