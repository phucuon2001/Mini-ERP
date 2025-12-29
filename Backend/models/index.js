// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('bms_pmc_2025_db', 'appuser', 'C#tGAP$v#kgPizw!Fe', {
  host: '103.9.211.220',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models và truyền sequelize vào
db.table01 = require('./table01')(sequelize, DataTypes);
db.dm_donvi = require('./dm_donvi')(sequelize, DataTypes); // nếu có

module.exports = db;
