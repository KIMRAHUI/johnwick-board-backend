// 📦 필요한 모듈 불러오기
const express = require('express');
const router = express.Router();
const multer = require('multer'); // 파일 업로드를 위한 미들웨어
const path = require('path');     // 파일 경로 및 확장자 처리용

// 📁 업로드된 파일 저장 방식 설정
const storage = multer.diskStorage({
  // ✅ 파일 저장 폴더 지정 (public/uploads/)
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  // ✅ 파일명 지정: 고유한 이름(타임스탬프+랜덤숫자)에 기존 확장자 유지
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// 📌 위 설정을 적용한 multer 인스턴스 생성
const upload = multer({ storage });

// ✅ 이미지 업로드 라우트
//    POST /api/upload
//    클라이언트에서 'upload' 필드로 단일 파일 전송 시 처리
router.post('/', upload.single('upload'), (req, res) => {
  const file = req.file;

  // ❌ 업로드된 파일이 없을 경우 에러 반환
  if (!file) {
    return res.status(400).json({ error: '파일이 없습니다.' });
  }

  // 🔗 업로드된 파일의 상대 경로를 클라이언트에 응답 (예: /uploads/파일명.jpg)
  const imageUrl = `/uploads/${file.filename}`;
  res.status(200).json({ url: imageUrl });
});

// 📤 모듈 내보내기
module.exports = router;
