import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import User from './Users.js';

const ClientUser = db.define('client', {
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
    schema: 'scm_b2c',
    freezeTableName: true
}
);

ClientUser.belongsTo(User, { foreignKey: 'user_id' });

export default ClientUser;
