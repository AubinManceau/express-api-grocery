import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import User from './Users.js';

const DeliveryManUser = db.define('deliveryMan', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    vehicle_type: {
        type: DataTypes.STRING
    }
},
{
    timestamps: false,
    schema: 'scm_delivery',
    freezeTableName: true
}
);

DeliveryManUser.belongsTo(User, { foreignKey: 'user_id' });

export default DeliveryManUser;
