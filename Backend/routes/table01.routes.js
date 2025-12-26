// routes/table01.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/table01.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;