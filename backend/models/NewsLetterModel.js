import mongoose from 'mongoose';
let randomNumber = Math.random();
let WholeNumber = Math.floor(randomNumber * 1000000000) + 1;
//  Model Starts here
const NewsLetterSchema = new mongoose.Schema(
  {
    username: {
      type: Number,
      default: WholeNumber,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const NewsLetter = mongoose.model('NewsLetter', NewsLetterSchema);
export default NewsLetter;
