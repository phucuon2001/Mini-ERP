// controllers/dm_nguoidung.controller.js
const db = require('../models');
const Dm_nguoidung = db['dm_nguoidung'];

exports.getAll = async (req, res) => {
  try {
    const data = await Dm_nguoidung.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).send('Lỗi lấy danh sách');
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Dm_nguoidung.findByPk(req.params.id);
    if (!item) return res.status(404).send('Không tìm thấy');
    res.json(item);
  } catch (err) {
    res.status(500).send('Lỗi khi tìm theo ID');
  }
};

exports.create = async (req, res) => {
  try {
    const item = await Dm_nguoidung.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).send('Lỗi tạo mới');
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Dm_nguoidung.findByPk(req.params.id);
    if (!item) return res.status(404).send('Không tìm thấy để cập nhật');
    await item.update(req.body);
    res.send('Cập nhật thành công');
  } catch (err) {
    res.status(500).send('Lỗi cập nhật');
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Dm_nguoidung.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) return res.status(404).send('Không tìm thấy để xoá');
    res.send('Xoá thành công');
  } catch (err) {
    res.status(500).send('Lỗi xoá');
  }
};