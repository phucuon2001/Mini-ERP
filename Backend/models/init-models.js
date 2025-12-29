var DataTypes = require("sequelize").DataTypes;
var _dm_donvi = require("./dm_donvi");
var _dm_nguoidung = require("./dm_nguoidung");
var _table01 = require("./table01");
var _dm_danhmuc = require("./dm_danhmuc");

function initModels(sequelize) {
  var dm_donvi = _dm_donvi(sequelize, DataTypes);
  var dm_nguoidung = _dm_nguoidung(sequelize, DataTypes);
  var table01 = _table01(sequelize, DataTypes);
  var dm_danhmuc = _dm_danhmuc(sequelize, DataTypes);


  return {
    dm_donvi,
    dm_nguoidung,
    table01,
    dm_danhmuc,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
