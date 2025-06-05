const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 📁 업로드 저장 위치 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ POST /api/upload
router.post('/', upload.single('upload'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: '파일이 없습니다.' });
  }

  // 🔗 public 경로 기준 URL 반환
  const imageUrl = `/uploads/${file.filename}`;
  res.status(200).json({ url: imageUrl });
});

module.exports = router;
