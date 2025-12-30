const fs = require('fs');
const path = require('path');

const dbName = 'bms_pmc_2025_db';
const dbUser = 'appuser';
const dbPass = 'C#tGAP$v#kgPizw!Fe';
const dbHost = '103.9.211.220';
const dbPort = 3306;

const modelDir = path.resolve(__dirname, './models');

const modelFiles = fs.readdirSync(modelDir)
  .filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'init-models.js')
  .map(file => path.basename(file, '.js'));

if (modelFiles.length === 0) {
  console.log('❌ Không có model nào để tạo index.js');
  process.exit(1);
}

const modelLines = modelFiles.map(name => `  ${name},`).join('\n');

const content = `
const { Sequelize, DataTypes } = require('sequelize');
const initModels = require('./init-models');

const sequelize = new Sequelize('${dbName}', '${dbUser}', '${dbPass}', {
  host: '${dbHost}',
  dialect: 'mysql',
  port: ${dbPort},
  logging: false,
});

const {
${modelLines}
} = initModels(sequelize);

const db = {
  sequelize,
  Sequelize,
${modelLines}
};

module.exports = db;
`.trimStart();

fs.writeFileSync(path.join(modelDir, 'index.js'), content, 'utf8');
console.log('✅ Đã tạo models/index.js thành công với models:', modelFiles.join(', '));
