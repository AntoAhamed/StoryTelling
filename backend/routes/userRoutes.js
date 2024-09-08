const express = require('express');

const { register, login, addStory, getAllStories, readStory, saveStory, getStories } = require('../controllers/userController');

// middlewares
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// routes
router.post('/login', login);
router.post('/register', register);
router.post('/addStory', protect, addStory);
router.get('/getAllStories', protect, getAllStories);
router.post('/readStory', protect, readStory);
router.post('/saveStory', protect, saveStory);
router.get('/getStories', protect, getStories);

module.exports = router;
