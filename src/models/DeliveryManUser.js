import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const DeliveryManUser = db.define('deliveryMan', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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

export default DeliveryManUser;
