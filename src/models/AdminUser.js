import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const AdminUser = db.define('admin', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
},
{
    timestamps: false,
    schema: 'scm_global',
    freezeTableName: true
}
);

export default AdminUser;
