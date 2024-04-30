const Job = require('../models/Job');
const { deleteJob } = require('./utils/deleteJob');
const { getAllJob } = require('./utils/getAllJob');

// @desc        Delete job
// @route       DELETE /job/:id
// @access      Private
exports.deleteJob = deleteJob;

// @desc        Get all job
// @route       GET /job
// @access      Public
exports.getAllJob = getAllJob;

// @desc        Get single job
// @route       GET /job/:id
// @access      Public
exports.getJob = async (req, res) => {
  let query;
  query = Job.findById(req.params.id).populate({
    path: 'company',
    select: 'name address website desc tel picture',
  });

  try {
    const job = await query;

    if (!job) {
      return res.status(400).json({
        success: false,
        message: `Job not found with id of ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        Create new job
// @route       POST /job
// @access      Private
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot create job',
    });
  }
};
