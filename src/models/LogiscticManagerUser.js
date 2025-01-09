import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const LogisticManagerUser = db.define('logisticManager', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
},
{
    timestamps: false,
    schema: 'scm_delivery',
    freezeTableName: true
}
);

export default LogisticManagerUser;
