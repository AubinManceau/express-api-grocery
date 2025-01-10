import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import User from './Users.js';
import Circuit from './Circuits.js';

const Order = db.define('orders', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_date: {
        type: DataTypes.DATE
    },
    billing_address: {
        type: DataTypes.STRING
    },
    delivery_date: {
        type: DataTypes.DATE
    },
    delivery_address: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
    delivery_cost: {
        type: DataTypes.FLOAT
    },
    total_price: {
        type: DataTypes.FLOAT
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    circuit_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Circuit,
            key: 'circuit_id'
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{
    timestamps: false,
    schema: 'scm_order'
}
);

Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Circuit, { foreignKey: 'circuit_id' });

export default Order;
