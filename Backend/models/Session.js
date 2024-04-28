const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true,
  },
  job: {
    type: mongoose.Schema.ObjectId,
    ref: 'Job',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  resume: {
    type: String,
  }
});

module.exports = mongoose.model('Session', SessionSchema);
