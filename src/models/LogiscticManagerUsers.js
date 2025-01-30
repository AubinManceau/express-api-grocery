import { DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./Users.js";

const LogisticManagerUser = db.define(
  "logisticManager",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: "user_id",
      },
    },
  },
  {
    timestamps: false,
    schema: "scm_delivery",
    freezeTableName: true,
  },
);

LogisticManagerUser.belongsTo(User, { foreignKey: "user_id" });

export default LogisticManagerUser;
