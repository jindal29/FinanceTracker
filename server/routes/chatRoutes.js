const express = require('express');
const { processChatMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, processChatMessage);

module.exports = router;
