const express = require('express');
const {
  getAllJob,
  getJob,
  createJob,
  deleteJob,
} = require('../controllers/jobController');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getAllJob)
  .post(protect, authorize('admin'), createJob);
router
  .route('/:id')
  .get(protect, getJob)
  .delete(protect, authorize('admin'), deleteJob);

module.exports = router;
