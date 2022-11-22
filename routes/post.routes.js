const express = require('express');
const {
  createPost,
  deletePost,
  updatePost,
  getPosts,
} = require('../controllers/post.controller');
const isLoggedIn = require('../middleware/isLoggedIn');

const router = express.Router();

router.route('/post/create').post(isLoggedIn, createPost);

router.route('/post/update/:id').put(isLoggedIn, updatePost);

router.route('/post/delete/:id').delete(isLoggedIn, deletePost);

router.route('/post/posts').get(getPosts);

module.exports = router;
