const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// ✅ 게시글 전체 조회
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('johnwick_board_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ✅ 게시글 등록
router.post('/', async (req, res) => {
  const { title, content, author, access_code } = req.body;

  if (!title || !content || !author || !access_code) {
    return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
  }

  const { data, error } = await supabase
    .from('johnwick_board_posts')
    .insert([{ title, content, author, access_code, likes: 0, dislikes: 0 }])
    .select()
    .single();

  if (error) {
    console.error('게시글 등록 실패:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// ✅ 게시글 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { access_code } = req.body;

  const { data: post, error: fetchError } = await supabase
    .from('johnwick_board_posts')
    .select('access_code')
    .eq('id', id)
    .single();

  if (fetchError || !post) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }

  if (post.access_code !== access_code) {
    return res.status(403).json({ error: '요원 코드가 일치하지 않습니다.' });
  }

  const { error } = await supabase
    .from('johnwick_board_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('삭제 실패:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: '삭제 완료' });
});

// ✅ 게시글 수정
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, access_code } = req.body;

  const { data: post, error: fetchError } = await supabase
    .from('johnwick_board_posts')
    .select('access_code')
    .eq('id', id)
    .single();

  if (fetchError || !post) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }

  if (post.access_code !== access_code) {
    return res.status(403).json({ error: '요원 코드가 일치하지 않습니다.' });
  }

  const { data, error } = await supabase
    .from('johnwick_board_posts')
    .update({ title, content })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('수정 실패:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ✅ 좋아요/싫어요
router.patch('/:id/reactions', async (req, res) => {
  const { id } = req.params;
  const { likes, dislikes } = req.body;

  const { data, error } = await supabase
    .from('johnwick_board_posts')
    .update({ likes, dislikes })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('좋아요/싫어요 반영 실패:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ✅ 댓글 등록
router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { content, author } = req.body;

  if (!content || !author) {
    return res.status(400).json({ error: '댓글 내용과 작성자 필수입니다.' });
  }

  const { data, error } = await supabase
    .from('johnwick_board_comments')
    .insert([{ post_id: id, content, author }])
    .select()
    .single();

  if (error) {
    console.error('댓글 등록 실패:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// ✅ 댓글 조회
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('johnwick_board_comments')
    .select('*')
    .eq('post_id', id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('댓글 조회 실패:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = router;
