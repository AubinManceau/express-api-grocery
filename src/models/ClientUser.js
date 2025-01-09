import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const ClientUser = db.define('client', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
},
{
    timestamps: false,
    schema: 'scm_b2c',
    freezeTableName: true
}
);

export default ClientUser;
