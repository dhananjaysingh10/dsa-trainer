const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  code: String,
  problems: [String], // e.g. leetcode slugs
  attendees: [String],
  startTime: Date,
  duration: Number,
  standings: {
    type: Map,
    of: Object // { "0": time, "1": time, penalty: totalTime }
  }
});

module.exports = mongoose.model('Contest', contestSchema);
