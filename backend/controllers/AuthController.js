// import User from '../models/userModel.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import expressAsyncHandler from 'express-async-handler';
// import sendToken from '../utils/jwtToken.js';
// import sendEmail from '../utils/sendEmail.js';
// import ErrorHandler from '../utils/errorHandler.js';
// import cloudinary from 'cloudinary';
// import crypto from 'crypto';
// import mg from 'mailgun-js';

var User = require('../models/userModel.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var expressAsyncHandler = require('express-async-handler');
var sendToken = require('../utils/jwtToken.js');
var sendEmail = require('utils/sendEmail.js');
var ErrorHandler = require('../utils/errorHandler.js');
var cloudinary = require('cloudinary');
var crypto = require('crypto');
var mg = require('mailgun-js');
// forgetPassword
const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: 'We have sent the email if the email you provided is correct.',
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASS_KEY, {
      expiresIn: '1h',
    });
    const data = {
      from: 'noreply@zalazon.com',
      to: email,
      subject: 'Password Reset Link - Zalazon.',
      html: `
      <h2> Please click on the given link to reset your password.</h2>
      <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
      `,
    };
    return user.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: 'Reset Password Failed' });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.json({
              error: error.message,
            });
          }
          return res.json({
            message:
              'Email has been sent successfully. Check your email account if you have provided the correct email address.',
          });
        });
      }
    });
  });
};

/////////////////////////////// forgetPassword ends

// Register new user
const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new User(req.body);
  const { username } = req.body;
  try {
    // addition new
    const oldUser = await User.findOne({ username });

    if (oldUser)
      return res.status(400).json({ message: 'User already exists' });

    // changed
    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

// Changed
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json('wrong password');
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1d' }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// This is v1 coding

// Register a user   => /api/v1/register
const registerUserv1 = expressAsyncHandler(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });

  const { name, email, password, username } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    username,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  sendToken(user, 200, res);
});

// Login User  =>  /a[i/v1/login
const loginUserv1 = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  sendToken(user, 200, res);
});

// Forgot Password   =>  /api/v1/password/reset
const forgotPasswordv1 = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    // return next(new ErrorHandler('User not found with this email', 404));
    // console.log(res);
    return res.json({
      message: `<span style="color:red;">User not found with this email. <i className="fa-regular fa-circle-xmark UI_icon_small_crossforget"></i></span>`,
    });
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  // console.log(resetToken);
  await user.save({ validateBeforeSave: false });

  // Create reset password url
  // const resetUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/password/reset/${resetToken}`;
  const resetUrl = `${process.env.FRONTEND_URL_RESET}/password/reset/${resetToken}`;

  const message = `Click on the link below to reset your password:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.\n\nIt will expire in one hour.`;
  const data = {
    from: 'noreply@Zalazon.com',
    to: user.email,
    subject: 'Reset Your Account Password - Zalazon.',
    text: message,
  };
  try {
    await mailgun()
      .messages()
      .send(data, function (error, body) {
        // console.log(body);
        if (error) {
          return res.json({
            error: err.message,
          });
        }
        return res.json({
          message: `<span style="color:#000;">Email sent to: </span><span style="font-weight:bold;color:#000;">${user.email}<i class="fa-regular fa-circle-check UI_icon_small_tickforget"></i></span>`,
        });
      });
    // await sendEmail({
    //   email: user.email,
    //   subject: 'Reset Your Account Password - Zalazon.',
    //   message,
    // });

    // res.status(200).json({
    //   success: true,
    //   message: `<span style="color:#000;">Email sent to: </span><span style="font-weight:bold;color:#000;">${user.email}</span>`,
    // });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password   =>  /api/v1/password/reset/:token
const resetPasswordv1 = expressAsyncHandler(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Password reset token is invalid or has been expired',
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get currently logged in user details   =>   /api/v1/me
const getUserProfilev1 = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update / Change password   =>  /api/v1/password/update
const updatePasswordv1 = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect'));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// Update user profile   =>   /api/v1/me/update
const updateProfilev1 = expressAsyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar
  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Logout user   =>   /api/v1/logout
const logoutv1 = expressAsyncHandler(async (req, res, next) => {
  // const userById = await User.find({ _id: req.params._id });
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
});

// Admin Routes

// Get all users   =>   /api/v1/admin/users
const allUsersv1 = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get user details   =>   /api/v1/admin/user/:id
const getUserDetailsv1 = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile   =>   /api/v1/admin/user/:id
const updateUserv1 = expressAsyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete user   =>   /api/v1/admin/user/:id
const deleteUserv1 = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  // Remove avatar from cloudinary
  const image_id = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await user.remove();

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  mailgun,
  forgetPassword,
  registerUser,
  loginUser,
  registerUserv1,
  loginUserv1,
  forgotPasswordv1,
  resetPasswordv1,
  getUserProfilev1,
  updatePasswordv1,
  updateProfilev1,
  logoutv1,
  allUsersv1,
  getUserDetailsv1,
  updateUserv1,
  deleteUserv1,
};
