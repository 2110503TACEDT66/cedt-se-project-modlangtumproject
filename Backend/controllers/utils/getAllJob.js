const Job = require('../../models/Job');

exports.getAllJob = async (req, res) => {
  let query;
  if (req.params.companyId) {
    query = Job.find({ company: req.params.companyId }).populate({
      path: 'company',
      select: 'name address website desc tel picture',
    });
  } else {
    query = Job.find().populate({
      path: 'company',
      select: 'name address website desc tel picture',
    });
  }

  try {
    const job = await query;

    res.status(200).json({
      success: true,
      count: job.length,
      data: job,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot find job',
    });
  }
};
