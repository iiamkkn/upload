var mongoose = require('mongoose');

const userVeriificationSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  uniqueString: {
    type: String,
  },
  createdAt: { type: Date },
  expiresAt: { type: Date },
});

const UserVerification = mongoose.model(
  'UserVerification',
  userVeriificationSchema
);
module.exports = { UserVerification };
