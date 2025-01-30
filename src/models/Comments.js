import { DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./Users.js";
import ToSale from "./ToSales.js";

const Comment = db.define(
  "comments",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
    },
    comment_date: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
    },
    toSale_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ToSale,
        key: "toSale_id",
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    schema: "scm_b2c",
  },
);

Comment.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(ToSale, { foreignKey: "toSale_id" });

export default Comment;
