const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const {
  registerValidation,
  loginValidation,
} = require('../validators/authValidator');

// @route   POST /api/auth/register
router.post('/register', registerValidation, validate, registerUser);

// @route   POST /api/auth/login
router.post('/login', loginValidation, validate, loginUser);

// @route   GET /api/auth/profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
