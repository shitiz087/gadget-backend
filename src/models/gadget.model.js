const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Gadget', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secretInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
