// controllers/InitModels.controller.js
const db = require('../models/init-models');
const InitModels = db['InitModels'];

// GET all
exports.getAll = async (req, res) => {
  try {
    const data = await InitModels.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).send('Lỗi lấy danh sách');
  }
};

// GET by ID
exports.getById = async (req, res) => {
  try {
    const item = await InitModels.findByPk(req.params.id);
    if (!item) return res.status(404).send('Không tìm thấy');
    res.json(item);
  } catch (err) {
    res.status(500).send('Lỗi khi tìm theo ID');
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const item = await InitModels.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).send('Lỗi tạo mới');
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const [updated] = await InitModels.update(req.body, {
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
    const deleted = await InitModels.destroy({
      where: { ID: req.params.id }
    });
    if (deleted === 0) return res.status(404).send('Không tìm thấy để xoá');
    res.send('Xoá thành công');
  } catch (err) {
    res.status(500).send('Lỗi xoá');
  }
};