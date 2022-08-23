var mongoose = require('mongoose');

const resetTokensSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: () => Date.now(),
  },
  // will automatically delete after 10 min
  // can be a bit delay, because the bg thread runs every 60 minutes
  expire_at: { type: Date, default: Date.now, expires: 60 * 60 * 1000 },
});
const resetToken = mongoose.model('resetToken', resetTokensSchema);

module.exports = { resetToken };
