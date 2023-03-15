/* eslint-disable security/detect-object-injection */
const Sequelize = require('sequelize');
const operatorsAliases = require('./sequelize-operators-aliases');
const Example = require('./example.model');
const Recharge= require('./recharge.model');
const Recharge_Track=require('./recharge-track.model')
const CONFIG = require('../../config/config');

let sequelize;
if (CONFIG.postgres) {
  sequelize = new Sequelize(CONFIG.postgres, {
    operatorsAliases,
    dialect: 'postgres',
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    {
      username: CONFIG.db.username,
      password: CONFIG.db.password,
      database: CONFIG.db.database,
      host: CONFIG.db.host,
      port: CONFIG.db.port,
      operatorsAliases,
      dialect: 'postgres',
      logging: false,
    },
  );
}

Example(sequelize, Sequelize.DataTypes);
Recharge(sequelize, Sequelize.DataTypes);
Recharge_Track(sequelize,Sequelize.DataTypes);

const { models } = sequelize;

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, models };
