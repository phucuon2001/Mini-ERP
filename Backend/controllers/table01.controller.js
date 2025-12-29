// controllers/table01.controller.js
const db = require('../models');
const Table01 = db.table01;


// GET all
exports.getAll = async (req, res) => {
  try {
    console.log(Table01);
    const data = await Table01.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).send('Lỗi lấy danh sách');
  }
};

// GET by ID
exports.getById = async (req, res) => {
  try {
    const item = await Table01.findByPk(req.params.id);
    if (!item) return res.status(404).send('Không tìm thấy');
    res.json(item);
  } catch (err) {
    res.status(500).send('Lỗi khi tìm theo ID');
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const item = await Table01.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).send('Lỗi tạo mới');
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const [updated] = await Table01.update(req.body, {
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
    const deleted = await Table01.destroy({
      where: { ID: req.params.id }
    });
    if (deleted === 0) return res.status(404).send('Không tìm thấy để xoá');
    res.send('Xoá thành công');
  } catch (err) {
    res.status(500).send('Lỗi xoá');
  }
};