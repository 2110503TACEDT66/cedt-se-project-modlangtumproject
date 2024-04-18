const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  update,
  deleteUser
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
router.put('/update', protect, update);
router.delete('/delete/:id', deleteUser)

module.exports = router;
