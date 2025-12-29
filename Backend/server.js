// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL thủ công cho route đơn giản
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: '103.9.211.220',
  user: 'appuser',
  password: 'C#tGAP$v#kgPizw!Fe',
  database: 'bms_pmc_2025_db'
});

db.connect(err => {
  if (err) {
    console.error('❌ Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('✅ Kết nối MySQL thành công!');
});

// ✅ Route thủ công GET từ MySQL
app.get('/', (req, res) => {
  const sqlQuery = 'SELECT * FROM bms_pmc_2025_db.table01';
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn MySQL:', err);
      return res.status(500).send('Lỗi máy chủ nội bộ');
    }
    return res.json(results);
  });
});

// ✅ Các route thủ công khác
app.post('/create', (req, res) => {
  const { Ma, Ten } = req.body;
  const sqlInsert = 'INSERT INTO bms_pmc_2025_db.table01 (Ma, Ten) VALUES (?, ?)';
  db.query(sqlInsert, [Ma, Ten], (err, results) => {
    if (err) return res.status(500).send('Lỗi máy chủ nội bộ');
    return res.status(201).send('Sinh viên được tạo thành công');
  });
});

app.put('/update/:id', (req, res) => {
  const { Ma, Ten } = req.body;
  const id = req.params.id;
  const sqlUpdate = 'UPDATE bms_pmc_2025_db.table01 SET Ma = ?, Ten = ? WHERE ID = ?';
  db.query(sqlUpdate, [Ma, Ten, id], (err, results) => {
    if (err) return res.status(500).send('Lỗi máy chủ nội bộ');
    return res.send('Sinh viên được cập nhật thành công');
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sqlDelete = 'DELETE FROM bms_pmc_2025_db.table01 WHERE ID = ?';
  db.query(sqlDelete, [id], (err, results) => {
    if (err) return res.status(500).send('Lỗi máy chủ nội bộ');
    return res.send('Sinh viên được xóa thành công');
  });
});



const donviRoutes = require('./routes/dm_donvi.routes');
app.use('/api/donvi', donviRoutes);

const table01Routes = require('./routes/table01.routes');
app.use('/api/table01', table01Routes);

app.listen(3036, () => {
  console.log('🚀 Server đang chạy ở cổng 3036');
});
