import { DataTypes } from "sequelize";
import db from "../config/database.js";
import logisticManagerUser from "./LogiscticManagerUsers.js";
import deliveryManUser from "./DeliveryManUsers.js";

const Circuit = db.define(
  "circuits",
  {
    circuit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    circuit_date: {
      type: DataTypes.DATE,
    },
    circuit_expected_time: {
      type: DataTypes.TIME,
    },
    circuit_real_time: {
      type: DataTypes.TIME,
    },
    user_id_logisticManager: {
      type: DataTypes.INTEGER,
      references: {
        model: logisticManagerUser,
        key: "user_id",
      },
    },
    user_id_deliveryMan: {
      type: DataTypes.INTEGER,
      references: {
        model: deliveryManUser,
        key: "user_id",
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    schema: "scm_delivery",
  },
);

Circuit.belongsTo(logisticManagerUser, {
  foreignKey: "user_id_logisticManager",
});
Circuit.belongsTo(deliveryManUser, { foreignKey: "user_id_deliveryMan" });

export default Circuit;
