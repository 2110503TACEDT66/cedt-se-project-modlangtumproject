const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Please add job's name`],
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      required: [true, `Please add job's description`],
    },
    requirement: {
      type: String,
    },
    salary: {
      type: String,
      required: [true, `Please add job's salary`],
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

JobSchema.virtual('sessions', {
  ref: 'Session',
  localField: '_id',
  foreignField: 'job_id',
  justOne: false,
});

JobSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    console.log(`Sessions being removed from job ${this._id}`);
    await this.model('Session').deleteMany({ job: this._id });
    next();
  },
);

module.exports = mongoose.model('Job', JobSchema);