const { Sequelize } = require('sequelize');
const GadgetModel = require('./gadget.model');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dev.sqlite',
});

const Gadget = GadgetModel(sequelize);

module.exports = {
  sequelize,
  Gadget,
};
