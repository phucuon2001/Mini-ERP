const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dm_cuahang', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ten: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    DiaChi: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    DienThoai: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    MaSoThue: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    GiamDoc: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    KeToanTruong: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    MaDangKy: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    User1: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Date1: {
      type: DataTypes.DATE,
      allowNull: true
    },
    User2: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Date2: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dm_cuahang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
