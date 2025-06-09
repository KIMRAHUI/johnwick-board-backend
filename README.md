# 🕵️‍♂️ John Wick Continental – 백엔드 서버

**John Wick Continental**은 킬러 전용 호텔 세계관을 테마로 한 예약/시설/게시판 플랫폼입니다.  
이 레포지토리는 해당 서비스의 **Express.js 기반 백엔드 서버**로, **Supabase 연동**, **예약 처리**, **게시판 CRUD**, **이미지 업로드**, **비밀코드 인증 로직**을 제공합니다.

---

## 🛠 기술 스택

- **Backend Framework**: Express.js (Node.js)
- **Database**: Supabase (PostgreSQL)
- **File Upload**: Multer (로컬 디스크 저장 방식)
- **Authentication**: 비공식 코드(access_code) 기반 검증
- **Deployment**: Render (서버), Vercel (프론트엔드)

---

## ✨ 주요 기능

### ✅ 사용자 정보 관리
- 사용자 UUID 기반 정보 조회 API
- 프론트에서 로그인 상태 유지 및 사용자 인증 흐름 연동

### ✅ 시설 조회
- `/api/facilities`: 전체 시설 리스트 반환
- `/api/facilities/:id`: 개별 시설 상세 조회
- 일반 시설 vs 비밀 서비스 구분 가능

### ✅ 예약 처리
- `/api/reservation`: 예약 등록 (객실명, 날짜, 인원, 카드정보 포함)
- Supabase `reservations` 테이블에 저장
- 예약 완료 시 고유 예약 번호 자동 생성

### ✅ 게시판 (Board)
- `/api/posts`: 전체 게시글 목록 조회, 새 게시글 작성
- `/api/posts/:id`: 게시글 수정 및 삭제 (비밀코드 필요)
- `/api/posts/:id/reactions`: 좋아요/싫어요 갱신
- `/api/posts/:id/comments`: 댓글 등록 및 목록 조회
- `/api/posts/:id/comments/:commentId`: 댓글 수정 및 삭제 (비밀코드 필요)

### ✅ 이미지 업로드
- `/api/upload`: 게시판 또는 후기용 이미지 업로드 지원
- `public/uploads/` 경로에 저장되며, 클라이언트에서는 `/uploads/파일명` 형식으로 접근 가능

---

## 📂 디렉토리 구조
```
johnwick-backend/
┣ routes/
┃ ┣ auth.js # 사용자 인증/조회 관련 (UUID 기반)
┃ ┣ posts.js # 게시판 및 댓글 관련 API
┃ ┣ reservation.js # 예약 저장 API
┃ ┣ facilities.js # 시설 정보 조회 API
┃ ┗ upload.js # 이미지 업로드 API
┣ supabaseClient.js # Supabase 연결 설정
┣ server.js # Express 서버 실행 진입점
┣ .env # 환경 변수 설정
┣ public/uploads/ # 이미지 저장 폴더 (Multer)
┣ package.json # 의존성 관리
┗ README.md # 백엔드 설명 문서
```

---

## 🔌 주요 API 엔드포인트 정리

| Method | Endpoint                                 | 설명                            |
|--------|------------------------------------------|---------------------------------|
| GET    | `/api/auth/user/:uuid`                   | 로그인 유저 정보 조회           |
| GET    | `/api/facilities`                        | 전체 시설 목록 조회             |
| GET    | `/api/facilities/:id`                    | 개별 시설 상세 조회             |
| POST   | `/api/reservation`                       | 예약 저장                        |
| GET    | `/api/posts`                             | 게시글 전체 조회                |
| POST   | `/api/posts`                             | 게시글 작성 (비밀코드 포함)     |
| PUT    | `/api/posts/:id`                         | 게시글 수정 (비밀코드 검증)     |
| DELETE | `/api/posts/:id`                         | 게시글 삭제 (비밀코드 검증)     |
| PATCH  | `/api/posts/:id/reactions`               | 좋아요/싫어요 갱신              |
| GET    | `/api/posts/:id/comments`                | 댓글 목록 조회                  |
| POST   | `/api/posts/:id/comments`                | 댓글 작성 (비밀코드 포함)       |
| PATCH  | `/api/posts/:id/comments/:commentId`     | 댓글 수정 (비밀코드 검증)       |
| DELETE | `/api/posts/:id/comments/:commentId`     | 댓글 삭제 (비밀코드 검증)       |
| POST   | `/api/upload`                            | 이미지 업로드 (Multer)          |

---

## 🚀 배포 방법 (Render 기준)

1. Render에서 Node.js 앱 생성
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. 환경 변수 등록 (Settings → Environment Variables):

SUPABASE_URL=https://gdisuhsgtxpcvxvlemuv.supabase.co
SUPABASE_KEY=서비스 역할 키 (절대 공개 금지)
JWT_SECRET=임의의 시크릿 키 (예: continental_secret_key)


5. CORS 허용 설정
   - Allowed Origin: `https://johnwick-continental.vercel.app` 등록

---

## 📌 보안 및 향후 개선점

- 비밀 코드(access_code)는 간단한 본인 검증용이며, 추후 암호화 또는 사용자 인증 연동으로 확장 가능
- 게시글/댓글 삭제/수정은 반드시 코드 일치 검증 후에만 가능
- 이미지 업로드는 현재 로컬 저장 방식이며, 향후 Supabase Storage 또는 S3로 확장 고려

---

## 🧠 어필 포인트

| 항목                       | 설명                                                                 |
|----------------------------|----------------------------------------------------------------------|
| ✅ Supabase DB 설계        | 사용자, 시설, 예약, 게시판, 댓글 테이블 직접 설계 및 관계 구성       |
| ✅ 실시간 REST API         | Express + Supabase 기반 CRUD 전반 직접 구현                          |
| ✅ 비공식 인증 시스템 구현 | access_code 기반 검증 로직 → 보안과 세계관 몰입을 함께 고려          |
| ✅ 프론트/백 완전 분리 배포 | 클라이언트 Vercel / 서버 Render 각각 배포 및 통신 성공적으로 구현     |
| ✅ 이미지 업로드 기능      | Multer 기반 업로드 기능 완비, 실제 후기/게시글 이미지 저장 가능       |

---

## 🧾 데이터베이스 초기화 SQL

- `sqld/supabase.sql`: Supabase 전용 스키마 및 초기 데이터
- `sqld/mysql.sql`: 로컬 개발 환경(MySQL/MariaDB)에서 테스트용 사용 가능

---

