const { Sequelize, DataTypes } = require('sequelize');
const initModels = require('./init-models');

const sequelize = new Sequelize('bms_pmc_2025_db', 'appuser', 'C#tGAP$v#kgPizw!Fe', {
  host: '103.9.211.220',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

const {
  dm_cuahang,
  dm_donvi,
  dm_nguoidung,
  table01,
} = initModels(sequelize);

const db = {
  sequelize,
  Sequelize,
  dm_cuahang,
  dm_donvi,
  dm_nguoidung,
  table01,
};

module.exports = db;
