const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ 파일 크기 제한 확장 (이미지 등 대용량 지원)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ CORS 허용
app.use(cors());

// ✅ 정적 폴더 제공 (이미지 접근 허용)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// 기본 라우트
app.get('/', (req, res) => {
  res.send('✅ John Wick Board Backend is live!');
});

// ✅ 게시글 라우트 등록
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

// ✅ 이미지 업로드 라우트 등록
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
