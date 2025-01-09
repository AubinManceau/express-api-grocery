import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const CommercialUser = db.define('commercial', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
},
{
    timestamps: false,
    schema: 'scm_commercial',
    freezeTableName: true
}
);

export default CommercialUser;
