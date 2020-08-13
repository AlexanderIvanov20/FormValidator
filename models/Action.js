const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const User = sequelize.define(
  "User",
  {
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    downloadUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// User.sync({ alter: true, force: true });

module.exports = User;
