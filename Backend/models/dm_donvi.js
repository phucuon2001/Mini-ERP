const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('dm_donvi', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    ma: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "uq_dm_donvi_ma"
    },
    ten: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    dia_chi: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    so_dien_thoai: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    giam_doc: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dang_theo_doi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    ngay_tao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
    tableName: 'dm_donvi',
    timestamps: false
  });
};
