// models/table01.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('table01', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ma: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    Ten: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'table01',
    timestamps: false
  });
};
