const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  contests: [{
    contestId: mongoose.Schema.Types.ObjectId,
    avgTime: Number,
    solved: Number,
    total: Number
  }]
});

module.exports = mongoose.model('User', userSchema);
