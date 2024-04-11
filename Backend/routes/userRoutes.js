const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
} = require('../controllers/userController');
const {
  forgetPassword,
  resetPassword,
} = require('../controllers/forgetPasswordController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/register', upload.single('profile'), register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;
