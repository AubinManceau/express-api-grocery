import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import CommercialUser from './CommercialUsers.js';
import SupplierUser from './SupplierUsers.js';

const Message = db.define('messages', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    message: {
        type: DataTypes.STRING
    },
    message_date: {
        type: DataTypes.DATE
    },
    user_id_commercial: {
        type: DataTypes.INTEGER,
        references: {
            model: CommercialUser,
            key: 'user_id'
        }
    },
    user_id_supplier: {
        type: DataTypes.INTEGER,
        references: {
            model: SupplierUser,
            key: 'user_id'
        }
    },
    user_id_sender: {
        type: DataTypes.INTEGER
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{
    timestamps: false,
    schema: 'scm_b2b'
}
);

Message.belongsTo(CommercialUser, { foreignKey: 'user_id_commercial' });
Message.belongsTo(SupplierUser, { foreignKey: 'user_id_supplier' });

export default Message;
