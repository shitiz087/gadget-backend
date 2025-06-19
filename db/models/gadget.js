'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gadget extends Model {
 
    static associate(models) {
      // define association here
    }
  }
  Gadget.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category: DataTypes.STRING,
    secretInfo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Gadget',
  });
  return Gadget;
};