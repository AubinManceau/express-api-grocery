import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import ToSale from './toSales.js';
import Order from './Oders.js'

const Article = db.define('article', {
    toSale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: ToSale,
            key: 'toSale_id'
        }
    },
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Order,
            key: 'order_id'
        }
    },
    unit_price: {
        type: DataTypes.FLOAT
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    requestedDate_service: {
        type: DataTypes.DATE
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{
    timestamps: false,
    schema: 'scm_order',
    freezeTableName: true
}
);

Article.belongsTo(ToSale, { foreignKey: 'toSale_id' });
Article.belongsTo(Order, { foreignKey: 'order_id' });

export default Article;
