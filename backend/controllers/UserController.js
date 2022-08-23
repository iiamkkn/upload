var User = require('../models/userModel.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var nodemailer = require('nodemailer');
var mg = require('mailgun-js');
var UserVerification = require('../models/userVerificationModel.js');
var { v4: uuidv4 } = require('uuid');

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
// Get a User
const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json('No such User');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// udpate a user

const updateUser = async (req, res) => {
  const id = req.params.id;
  // console.log("Data Received", req.body)
  const { _id, currentUserAdmin, password } = req.body;

  if (id === _id) {
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      // have to change this
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
      /*console.log({ user, token }); */
      res.status(200).json({ user, token });
    } catch (error) {
      // console.log('F**K');
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json('Access Denied! You can update only your own Account.');
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json('User Deleted Successfully!');
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('Access Denied!');
  }
};

// Follow a User
// changed
const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  // console.log(id, _id);
  if (_id == id) {
    res.status(403).json('Action Forbidden');
  } else {
    try {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json('User followed!');
      } else {
        res.status(403).json('you are already following this id');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

// Unfollow a User
// changed
const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json('Action Forbidden');
  } else {
    try {
      const unFollowUser = await User.findById(id);
      const unFollowingUser = await User.findById(_id);

      if (unFollowUser.followers.includes(_id)) {
        await unFollowUser.updateOne({ $pull: { followers: _id } });
        await unFollowingUser.updateOne({ $pull: { following: id } });
        res.status(200).json('Unfollowed Successfully!');
      } else {
        res.status(403).json('You are not following this User');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const activateAccount = async (req, res, next) => {
  const { RegisterverifyToken } = req.params;
  if (RegisterverifyToken) {
    jwt.verify(
      RegisterverifyToken,
      process.env.JWT_SECRET_KEY,
      function (err, decodedToken) {
        if (err) {
          return res.status(400).json({
            error:
              'Incorrect or Expired Link. Try Again by generating a new Link.',
          });
        }
        const { name, username, email, password } = decodedToken;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            return res
              .status(400)
              .json({ error: 'User with the same email already exists.' });
          }
          let newUser = new User({ name, username, email, password });
          newUser.save((err, success) => {
            if (err) {
              console.log('Error in Signup while activating the account.', err);
              return (
                res.status(400), json({ error: 'Error activating account' })
              );
            }
            const data = {
              from: 'noreply@Zalazon.com',
              to: email,
              subject: 'Congratulations! - Zalazon.',
              html: `
              <h2>Congratulations!!!</h2>
              <p>Your Account is Verified and You have been Registered Successfully at Zalazon.</p>
              
              `,
            };
            mailgun()
              .messages()
              .send(data, function (error, body) {
                if (error) {
                  return res.json({
                    error: err.message,
                  });
                }
                return res.json({
                  message: 'you are already verified. - Zalazon.',
                });
                // console.log(body);
              });

            res.json({
              message:
                'Congratulations!. You are Successfully Verified and Signed up.',
            });
          });
        });
      }
    );
  } else {
    return res.json({
      error: 'An error occurred while activating the account.',
    });
  }
};

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'iamkhushalnasar@gmail.com',
//     pass: '@Pashtun@Nasar#007',
//   },
// });

// // testing
// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Ready for Email Notifications.');
//     console.log(success);
//   }
// });
//  New SignUp

const NewSignUp = async (req, res) => {
  let { name, email, password, username, dateOfBirth } = req.body;
  name = name.trim();
  email = email.trim();
  username = username.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  if (
    name == '' ||
    email == '' ||
    password == '' ||
    username == '' ||
    dateOfBirth == ''
  ) {
    res.json({
      status: 'FAILED',
      message: 'All fields are required. It cannot be empty.',
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid Name Entered.',
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid Email Entered.',
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: 'FAILED',
      message: 'Invalid date of Birth Entered.',
    });
  } else if (password.length < 6) {
    res.json({
      status: 'FAILED',
      message: 'Password is too short.',
    });
  } else if (!/^[a-zA-Z]*$/.test(username)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid username Entered.',
    });
  } else {
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: 'FAILED',
            message:
              'User with the same email already exists. Try login instead.',
          });
        } else {
          // create new user
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                username,
                password: hashedPassword,
                email,
                dateOfBirth,
              });
              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: 'SUCCESS',
                    message: 'Registered Successfully.',
                    date: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: 'FAILED',
                    message: 'An Error occured while registering you.',
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An Error occured while hashing your password.',
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 'FAILED',
          message: 'An Error occured while checking for existing user.',
        });
      });
  }
};

const NewSignIn = async (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == '' || password == '') {
    res.json({
      status: 'FAILED',
      message: 'All fields are required. It cannot be empty.',
    });
  } else {
    User.findOne({ email })
      .then((date) => {
        if (date.length) {
          const hashedPassword = date[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                res.json({
                  status: 'SUCCESS',
                  message: 'LoggedIn Successfully.',
                  date: date,
                });
              } else {
                res.json({
                  status: 'FAILED',
                  message: 'Invalid password entered.',
                });
              }
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An Error occured while comparing passwords.',
              });
            });
        } else {
          res.json({
            status: 'FAILED',
            message: 'Invalid details entered.',
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 'FAILED',
          message: 'An Error occured while checking for existing user.',
        });
      });
  }
};

module.exports = {
  mailgun,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  activateAccount,
  NewSignUp,
  NewSignIn,
};
