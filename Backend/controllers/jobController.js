const Job = require('../models/Job');

// @desc        Get all job
// @route       GET /job
// @access      Public
exports.getAllJob = async (req, res) => {
  let query;

  const reqQuery = { ...req.query };

  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach((param) => delete reqQuery[param]);
  //console.log(reqQuery);

  let querStr = JSON.stringify(reqQuery);
  querStr = querStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  query = Job.find(JSON.parse(querStr)).populate('sessions');

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('name');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = await Job.countDocuments();
    query = query.skip(startIndex).limit(limit);

    const allJob = await query;
    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }
    res.status(200).json({
      success: true,
      count: allJob.length,
      pagination,
      data: allJob,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        Get single job
// @route       GET /job/:id
// @access      Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(400).json({ success: false, msg: `Job not found with id of ${req.params.id}` });
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
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Cannot create job',
    });
  }
};

// @desc        Delete job
// @route       DELETE /job/:id
// @access      Private
exports.deleteJob = async (req, res) => {
  
};
