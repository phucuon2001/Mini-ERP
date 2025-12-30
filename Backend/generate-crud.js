const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'models');
const controllersDir = path.join(__dirname, 'controllers');
const routesDir = path.join(__dirname, 'routes');

if (!fs.existsSync(controllersDir)) fs.mkdirSync(controllersDir);
if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir);

const modelFiles = fs.readdirSync(modelsDir).filter(f =>
  f.endsWith('.js') &&
  f !== 'index.js' &&
  f !== 'init-models.js'
);

modelFiles.forEach(file => {
  const modelName = path.basename(file, '.js');
  const className = modelName.charAt(0).toUpperCase() + modelName.slice(1);

  const controllerContent = `
// controllers/${modelName}.controller.js
const db = require('../models');
const ${className} = db['${modelName}'];

exports.getAll = async (req, res) => {
  try {
    const data = await ${className}.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).send('Lỗi lấy danh sách');
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await ${className}.findByPk(req.params.id);
    if (!item) return res.status(404).send('Không tìm thấy');
    res.json(item);
  } catch (err) {
    res.status(500).send('Lỗi khi tìm theo ID');
  }
};

exports.create = async (req, res) => {
  try {
    const item = await ${className}.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).send('Lỗi tạo mới');
  }
};

exports.update = async (req, res) => {
  try {
    const item = await ${className}.findByPk(req.params.id);
    if (!item) return res.status(404).send('Không tìm thấy để cập nhật');
    await item.update(req.body);
    res.send('Cập nhật thành công');
  } catch (err) {
    res.status(500).send('Lỗi cập nhật');
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await ${className}.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) return res.status(404).send('Không tìm thấy để xoá');
    res.send('Xoá thành công');
  } catch (err) {
    res.status(500).send('Lỗi xoá');
  }
};
  `.trim();

  fs.writeFileSync(path.join(controllersDir, `${modelName}.controller.js`), controllerContent);

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
