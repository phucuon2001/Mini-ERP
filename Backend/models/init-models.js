var DataTypes = require("sequelize").DataTypes;
var _dm_cuahang = require("./dm_cuahang");
var _dm_donvi = require("./dm_donvi");
var _dm_nguoidung = require("./dm_nguoidung");
var _table01 = require("./table01");

function initModels(sequelize) {
  var dm_cuahang = _dm_cuahang(sequelize, DataTypes);
  var dm_donvi = _dm_donvi(sequelize, DataTypes);
  var dm_nguoidung = _dm_nguoidung(sequelize, DataTypes);
  var table01 = _table01(sequelize, DataTypes);


  return {
    dm_cuahang,
    dm_donvi,
    dm_nguoidung,
    table01,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
