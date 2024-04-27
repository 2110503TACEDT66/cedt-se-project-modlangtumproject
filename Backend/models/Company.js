const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Please add company's name`],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, `Please add company's address`],
    },
    website: {
      type: String,
      required: [true, `Please add company's website`],
    },
    desc: {
      type: String,
    },
    tel: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CompanySchema.virtual('sessions', {
  ref: 'Session',
  localField: '_id',
  foreignField: 'company_id',
  justOne: false,
});

CompanySchema.virtual('job', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'job_id',
  justOne: false,
});

CompanySchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    console.log(`Sessions being removed from company ${this._id}`);
    await this.model('Session').deleteMany({ company: this._id });
    console.log(`Job being removed from company ${this._id}`);
    await this.model('Job').deleteMany({ company: this._id });
    next();
  },
);

module.exports = mongoose.model('Company', CompanySchema);
