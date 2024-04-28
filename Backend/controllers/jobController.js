const Job = require('../models/Job')

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
         
        if (!job) {
            return res.status(404).json({
                success: false,
                msg: `Job not found with id of ${req.params.id}`,
              });
        }
        await job.deleteOne();
        res.status(200).json({ success: true, data: job });
    } catch (err) {
        res.status(400).json({ success: false });
    }
}