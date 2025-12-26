const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto('bms_pmc_2025_db', 'appuser', 'C#tGAP$v#kgPizw!Fe', {
  host: '103.9.211.220',
  dialect: 'mysql',
  port: 3306,
  directory: './models',
  additional: {
    timestamps: false
  }
});

auto.run(err => {
  if (err) throw err;
  console.log('✅ Model generated successfully!');
});
