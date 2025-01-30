import { DataTypes } from "sequelize";
import db from "../config/database.js";
import toSale from "./ToSales.js";

const Service = db.define(
  "services",
  {
    toSale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: toSale,
        key: "toSale_id",
      },
    },
    service_time: {
      type: DataTypes.TIME,
    },
    nb_providers: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    schema: "scm_toSale",
    freezeTableName: true,
  },
);

Service.belongsTo(toSale, { foreignKey: "toSale_id" });

export default Service;
