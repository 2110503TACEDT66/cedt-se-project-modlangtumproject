const express = require('express')
const {
    deleteJob
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router
    .route('/:id')
    .delete(protect, authorize('admin'), deleteJob);
    
module.exports = router;