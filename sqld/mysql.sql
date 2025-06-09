-- 📝 게시글 테이블 생성 (MySQL 버전)
CREATE TABLE johnwick_board_posts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  access_code VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0
);

-- 📝 댓글 테이블 생성 (MySQL 버전)
CREATE TABLE johnwick_board_comments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  access_code VARCHAR(100),
  FOREIGN KEY (post_id) REFERENCES johnwick_board_posts(id) ON DELETE CASCADE
);

-- 📥 게시글 더미 데이터 삽입
INSERT INTO johnwick_board_posts
(title, content, author, access_code, created_at, likes, dislikes)
VALUES
(
  '첫 방문한 Continental의 추억',
  '
  고요한 밤, 컨티넨탈 호텔의 입구는 찬란하게 빛난다.
  <figure class="image">
    <img src="/hotel.png" alt="호텔 입구" />
  </figure>
  ',
  'John Wick',
  'continental42',
  '2025-05-28 00:00:00',
  3,
  0
),
(
  '살아남기 위한 훈련의 기록',
  '
  매일 새벽, 이곳은 전장의 전초기지처럼 변한다. 강철 같은 눈빛과 주먹, 그리고 흐르는 땀이 컨티넨탈의 룰을 지킨다.
  <figure class="image">
    <img src="/trainer.png" alt="트레이닝 센터" />
  </figure>
  ',
  'Winston',
  'continental42',
  '2025-05-28 00:00:00',
  5,
  1
);

-- 📥 댓글 더미 데이터 삽입
INSERT INTO johnwick_board_comments
(post_id, content, author, created_at, access_code)
VALUES
(1, '정말 멋진 순간이었겠네요. 컨티넨탈의 입구는 언제 봐도 감탄이 나옵니다.', 'Charon', '2025-06-05 14:00:00', 'continental42'),
(1, '그 장면, 저도 기억나요. 조용한 긴장감이 흐르던 그 밤!', 'Sharon', '2025-06-05 14:10:00', 'continental42'),
(2, '트레이닝 센터는 정말 무시무시하죠. 매번 가슴이 철렁해요.', 'Cassian', '2025-06-05 14:15:00', 'continental42'),
(2, '그곳은 단련의 끝판왕. 존 윅도 거기서 훈련했겠죠?', 'Ares', '2025-06-05 14:20:00', 'continental42');
