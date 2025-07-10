const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  contests: [{
    contestId: mongoose.Schema.Types.ObjectId,
    avgTime: Number,
    solved: Number,
    total: Number
  }],
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  },
  name: {
    type: String,
  },
  cf: {
    type: String,
  },
  cc: {
    type: String,
  },
  atcoder: {
    type: String,
  },
  leetcode: {
    type: String,
  },
  gfg: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
},

  {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);
