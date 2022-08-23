import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

//  Model Starts here
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxlength: [30, 'Your name cannot exceed 30 characters'],
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660330645/Zalazon_Icons/default_avatar_k1bdnz.jpg',
      required: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      // validate: [validator.isEmail, 'Please enter valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      // minlength: [6, 'Your password must be longer than 6 characters'],
      // select: false,
    },
    username: {
      type: String,
      required: [true, 'Please enter username'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      unique: true,
    },

    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: { type: String, default: 'No Name' },
      logo: {
        type: String,
        default:
          'https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660857757/avatars/no_store_cover_zalazon_3_iqfmcu.png',
      },
      cover: {
        type: String,
        default:
          'https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660857901/avatars/no_logo_store_1_aku37p.png',
      },
      description: String,
      rating: { type: Number, default: 0, required: false },
      numReviews: { type: Number, default: 0, required: false },
    },
    IdVerification: {
      document: String,
      nationality: String,
      country: String,
      front: String,
      back: String,
      checked: { type: Boolean, default: false, required: true },
      approved: { type: Boolean, default: false, required: true },
    },
    role: {
      type: Number,
      default: 2001,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: { type: Date },
    refreshToken: String,

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  {
    timestamps: true,
  }
);

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '3d',
  });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
export default User;
