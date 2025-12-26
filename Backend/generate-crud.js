// generate-crud.js
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'models');
const controllersDir = path.join(__dirname, 'controllers');
const routesDir = path.join(__dirname, 'routes');

if (!fs.existsSync(controllersDir)) fs.mkdirSync(controllersDir);
if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir);

// Lấy danh sách model file (bỏ qua index.js)
const modelFiles = fs.readdirSync(modelsDir).filter(f => f !== 'index.js' && f.endsWith('.js'));

modelFiles.forEach(file => {
  const modelName = path.basename(file, '.js'); // vd: dmDonvi
  const className = modelName.charAt(0).toUpperCase() + modelName.slice(1); // DmDonvi

  const controllerContent = `
// controllers/${modelName}.controller.js
const db = require('../models');
const ${className} = db['${modelName}'];

// GET all
exports.getAll = async (req, res) => {
  try {
    const data = await ${className}.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).send('Lỗi lấy danh sách');
  }
};

// GET by ID
exports.getById = async (req, res) => {
  try {
    const item = await ${className}.findByPk(req.params.id);
    if (!item) return res.status(404).send('Không tìm thấy');
    res.json(item);
  } catch (err) {
    res.status(500).send('Lỗi khi tìm theo ID');
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const item = await ${className}.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).send('Lỗi tạo mới');
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const [updated] = await ${className}.update(req.body, {
      where: { ID: req.params.id }
    });
    if (updated === 0) return res.status(404).send('Không tìm thấy để cập nhật');
    res.send('Cập nhật thành công');
  } catch (err) {
    res.status(500).send('Lỗi cập nhật');
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const deleted = await ${className}.destroy({
      where: { ID: req.params.id }
    });
    if (deleted === 0) return res.status(404).send('Không tìm thấy để xoá');
    res.send('Xoá thành công');
  } catch (err) {
    res.status(500).send('Lỗi xoá');
  }
};
  `.trim();

  fs.writeFileSync(path.join(controllersDir, `${modelName}.controller.js`), controllerContent);


  // Route generator
  const routeContent = `
// routes/${modelName}.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/${modelName}.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
`.trim();

  fs.writeFileSync(path.join(routesDir, `${modelName}.routes.js`), routeContent);

  console.log(`✅ Đã tạo controller & routes cho: ${modelName}`);
});
