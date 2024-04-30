const Job = require('../../models/Job');
const Company = require('../../models/Company');

exports.getAllJob = async (req, res) => {
  let query;
  if (req.params.companyId) {
    const company = await Company.findById(req.params.companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
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
    return res.status(400).json({
      success: false,
    });
  }
};
