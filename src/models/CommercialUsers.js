import { DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./Users.js";

const CommercialUser = db.define(
  "commercial",
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
    schema: "scm_commercial",
    freezeTableName: true,
  },
);

CommercialUser.belongsTo(User, { foreignKey: "user_id" });

export default CommercialUser;
