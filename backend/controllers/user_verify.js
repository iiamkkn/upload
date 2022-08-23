import User from '../models/userModel.js';
import Token from '../models/token.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import bcrypt from 'bcrypt';
import mg from 'mailgun-js';
import jwt from 'jsonwebtoken';
import NewsLetter from '../models/NewsLetterModel.js';
import expressAsyncHandler from 'express-async-handler';
import sendToken from '../utils/jwtToken.js';
import ErrorHandler from '../utils/errorHandler.js';

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

// export const SignUp_user_verify = async (req, res) => {
//   const { name, username, email, password } = req.body;
//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         message:
//           'User with the same email already exists. Try to Login Instead.',
//       });
//     }

//     const RegisterverifyToken = jwt.sign(
//       {
//         name,
//         email,
//         username,
//         password,
//       },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: '1h',
//       }
//     );

//     const data = {
//       from: 'noreply@Zalazon.com',
//       to: email,
//       subject: 'Account Verification Link - Zalazon.',
//       html: `
//           <h2>Please Click on the link below to verify your account.</h2>
//           <p>${process.env.BASEURL}users/verify/${RegisterverifyToken}</p>
//           `,
//     };
//     mailgun()
//       .messages()
//       .send(data, function (error, body) {
//         if (error) {
//           return res.json({
//             error: err.message,
//           });
//         }
//         return res.json({
//           message:
//             'Email has been sent Successfully. Kindy check your email address and activate your account. - Zalazon.',
//         });
//         // console.log(body);
//       });

//     // let newUser = new User({ name, username, email, password });
//     // newUser.save((err, success) => {
//     //   if (err) {
//     //     console.log('Error in Signup', err);
//     //     return res.status(400), json({ error: err });
//     //   }
//     //   res.json({
//     //     message: 'Successfully signed up',
//     //   });
//     // });
//   });
// };

export const SignUp_user_verify = async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error)
    //   return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: 'User with given email already Exist!' });

    if (req.body.password === '') {
      return res.status(409).send({ message: 'Please enter your password!' });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    // const hashPassword = await bcrypt.hash(req.body.password, salt);
    const hashPassword = req.body.password;

    user = await new User({ ...req.body, password: hashPassword }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();
    const url = `${process.env.BASEURL}users/${user.id}/verify/${token.token}`;
    // await sendEmail(user.email, 'Verify Email', url);

    const data = {
      from: 'noreply@Zalazon.com',
      to: user.email,
      subject: 'Account Verification Link - Zalazon.',
      html: `
        <h2>Please Click on the link below to verify your account.</h2>
        <b>${url}</b>
        `,
    };
    await mailgun()
      .messages()
      .send(data, function (error, body) {
        if (error) {
          return res.json({
            error: error.message,
          });
        }
        return res.json({
          message: `Email sent to:${user.email} successfully. Check your inbox and try to activate your account.`,
        });
        // console.log(body);
      });

    // res
    //   .status(201)
    //   .send({ message: 'An Email sent to your account please verify' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// try catch one

export const SignUp_Link_verification = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: 'Invalid user' });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
      return res
        .status(400)
        .json({ message: 'Invalid link. It has been expired. Try again.' });

    await User.updateOne({ _id: user._id }, { isVerified: true });
    await token.remove();

    res.status(200).send({ message: 'Email verified successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'An Internal Server Error Occured. Please Try Again later.',
    });
  }
};

// {}if else one

// export const SignUp_Link_verification = async (req, res) => {
//   const user = await User.findOne({ _id: req.params.id });
//   if (user) {
//     const token = await Token.findOne({
//       userId: user._id,
//       token: req.params.token,
//     });
//     if (!token)
//       return res.status(400).json({ message: 'Invalid Verification link' });
//     if (user) {
//       await token.remove();
//       //   let verified = { isVerified: true };
//       await User.updateOne({ _id: user._id, isVerified: true });

//       return res
//         .status(200)
//         .json({ message: 'Email verified xxxsuccessfully' });
//     }
//   } else {
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid User link' });
//     }
//     if (error) {
//       return res
//         .status(500)
//         .json({ message: 'Internal Server Error while verifying email' });
//     }
//   }
// };

export const Subscribe_newsLetter = async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error)
    //   return res.status(400).send({ message: error.details[0].message });

    let user = await NewsLetter.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: 'You have already followed our Newsletter.' });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    // const hashPassword = await bcrypt.hash(req.body.password, salt);
    const hashPassword = req.body.password;

    user = await new NewsLetter({ ...req.body, password: hashPassword }).save();

    // await sendEmail(user.email, 'Verify Email', url);

    const data = {
      from: 'noreply@Zalazon.com',
      to: user.email,
      subject: 'Newsletter - Zalazon. ',
      html: `
        <h2>Thank You!</h2>\n\
        
        <p>You have successfully followed Zalazon. Newsletter. with following email: <b>${user.email}</b></p>\n\
        <p>All Latest Products will be sent to you.</p>
        `,
    };
    await mailgun()
      .messages()
      .send(data, function (error, body) {
        if (error) {
          return res.json({
            error: error.message,
          });
        }
        return res.json({
          message: `You have followed Zalazon NewsLetter Successfully.`,
        });
        // console.log(body);
      });

    // res
    //   .status(201)
    //   .send({ message: 'An Email sent to your account please verify' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const user_forgetpass = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(409).send({ message: 'Incorrect Email Address.' });

    // const token = await new Token({
    //   userId: user._id,
    //   token: crypto.randomBytes(32).toString('hex'),
    // }).save();
    // const url = `${process.env.BASEURL}users/${user.id}/verify/${token.token}`;
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.FRONTEND_URL_RESET}/password/reset/${resetToken}`;

    const data = {
      from: 'noreply@Zalazon.com',
      to: user.email,
      subject: 'Reset Your Account Password - Zalazon.',
      html: `
        <h2>Please Click on the link below to reset your password.</h2>
        <b>${resetUrl}</b>
        `,
    };
    await mailgun()
      .messages()
      .send(data, function (error, body) {
        if (error) {
          return res.json({
            error: error.message,
          });
        }
        return res.json({
          message: `${user.email}.`,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const user_forgetpass_update = expressAsyncHandler(
  async (req, res, next) => {
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
      return next(new ErrorHandler('The Password Link is Expired.', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler('Password does not match', 400));
    }
    if (req.body.password === '' || req.body.confirmPassword === '') {
      return next(new ErrorHandler('Password Input is empty', 400));
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // sendToken(user, 200, res);
    res.status(200).send({ message: 'Password upddated Successfully' });
  }
);
