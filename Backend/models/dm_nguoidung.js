const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dm_nguoidung', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    ten_dang_nhap: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "uq_nguoidung_tendangnhap"
    },
    mat_khau_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ten_hien_thi: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    so_dien_thoai: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    trang_thai: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    ngay_tao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    nguoi_tao_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    ngay_cap_nhat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nguoi_cap_nhat_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dm_nguoidung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "uq_nguoidung_tendangnhap",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ten_dang_nhap" },
        ]
      },
    ]
  });
};
