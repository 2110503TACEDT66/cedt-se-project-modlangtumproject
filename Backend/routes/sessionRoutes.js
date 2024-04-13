const express = require('express');
const {
  getSessions,
  getSession,
  addSession,
  updateSession,
  deleteSession,
} = require('../controllers/sessionController');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/authMiddleware');
const uploadResume = require('../middleware/uploadResume')
router
  .route('/')
  .get(protect, getSessions)
  .post(protect, authorize('admin', 'user'), uploadResume.single('resume'), addSession);
router
  .route('/:id')
  .get(protect, getSession)
  .put(protect, authorize('admin', 'user'), uploadResume.single('resume'), updateSession)
  .delete(protect, authorize('admin', 'user'), deleteSession);

module.exports = router;
