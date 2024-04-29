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

const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:resetToken', resetPassword);
router.put('/update', protect, authorize('admin', 'user'), update);
router.delete('/delete/:id', deleteUser)
module.exports = router;
