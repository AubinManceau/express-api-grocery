import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import AdminUser from './AdminUsers.js';
import SupplierUser from './SupplierUsers.js';
import CommercialUser from './CommercialUsers.js';

const assignDemand = db.define('assignDemand', {
    assigned_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING
    },
    user_id_admin: {
        type: DataTypes.INTEGER,
        references: {
            model: AdminUser,
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
    user_id_commercial: {
        type: DataTypes.INTEGER,
        references: {
            model: CommercialUser,
            key: 'user_id'
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{
    timestamps: false,
    schema: 'scm_b2b',
    freezeTableName: true
}
);

assignDemand.belongsTo(AdminUser, { foreignKey: 'user_id_admin' });
assignDemand.belongsTo(SupplierUser, { foreignKey: 'user_id_supplier' });
assignDemand.belongsTo(CommercialUser, { foreignKey: 'user_id_commercial' });

export default assignDemand;
