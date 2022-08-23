import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import Token from '../models/token.js';
import { generateToken, isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import {
  allUsersv1,
  deleteUserv1,
  forgotPasswordv1,
  getUserDetailsv1,
  getUserProfilev1,
  loginUser,
  loginUserv1,
  logoutv1,
  registerUser,
  registerUserv1,
  resetPasswordv1,
  updatePasswordv1,
  updateProfilev1,
  updateUserv1,
} from '../controllers/AuthController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';
import {
  activateAccount,
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  NewSignIn,
  NewSignUp,
  unfollowUser,
  updateUser,
} from '../controllers/UserController.js';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';
import ROLES_LIST from '../config/roles_list.js';
import mg from 'mailgun-js';
// import { SignUp_user_verify, SignUp_user_verify_get } from './user_verify.js';

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

const userRouter = express.Router();

// top seller routes
userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);
    res.send(topSellers);
  })
);

// get and list all users
userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.image = req.body.image || user.image;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.cover = req.body.sellerCover || user.seller.cover;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;

        // id verification
        user.IdVerification.document =
          req.body.document || user.IdVerification.document;
        user.IdVerification.nationality =
          req.body.nationality || user.IdVerification.nationality;
        user.IdVerification.country =
          req.body.country || user.IdVerification.country;
        user.IdVerification.front = req.body.front || user.IdVerification.front;
        user.IdVerification.back = req.body.back || user.IdVerification.back;
        user.IdVerification.checked =
          Boolean(req.body.checked) || Boolean(user.IdVerification.checked);
      }
      // if (req.body.password) {
      //   user.password = bcrypt.hashSync(req.body.password, 8);
      // }
      if (req.body.password) {
        user.password = req.body.password;
      }
      // try {
      //   mailgun()
      //     .messages()
      //     .send(
      //       {
      //         from: 'Zalazon <support@zalazon.com>',
      //         to: user.email,
      //         subject: `Store Verification - Zalazon`,
      //         html: `
      //         <h2>Thank You!</h2>\n\n
      //         <b>${user.name}</b>

      //         <p>You have successfully uploaed your documents for verification at Zalazon.</p>\n\
      //         <p>We will notify you as soon as we check and approve your documents</p>
      //         `,
      //       },
      //       (error, body) => {
      //         if (error) {
      //           console.log(error);
      //         } else {
      //           console.log(body);
      //         }
      //       }
      //     );
      // } catch (err) {
      //   console.log(err);
      // }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        image: updatedUser.image,
        email: updatedUser.email,
        image: user.image,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.put(
  '/store/verification',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.image = req.body.image || user.image;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.cover = req.body.sellerCover || user.seller.cover;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;

        // id verification
        user.IdVerification.document =
          req.body.document || user.IdVerification.document;
        user.IdVerification.nationality =
          req.body.nationality || user.IdVerification.nationality;
        user.IdVerification.country =
          req.body.country || user.IdVerification.country;
        user.IdVerification.front = req.body.front || user.IdVerification.front;
        user.IdVerification.back = req.body.back || user.IdVerification.back;
        user.IdVerification.checked =
          Boolean(req.body.checked) || Boolean(user.IdVerification.checked);
      }
      // if (req.body.password) {
      //   user.password = bcrypt.hashSync(req.body.password, 8);
      // }
      if (req.body.password) {
        user.password = req.body.password;
      }
      try {
        mailgun()
          .messages()
          .send(
            {
              from: 'Zalazon <support@zalazon.com>',
              to: user.email,
              subject: `Store Verification - Zalazon`,
              html: `
              <h2>Thank You!</h2>\n\n
              <b>${user.name}</b>
              
              <p>You have successfully uploaed your documents for verification at Zalazon.</p>\n\
              <p>We will notify you as soon as we check and approve your documents</p>
              `,
            },
            (error, body) => {
              if (error) {
                console.log(error);
              } else {
                console.log(body);
              }
            }
          );
      } catch (err) {
        console.log(err);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        image: updatedUser.image,
        email: updatedUser.email,
        image: user.image,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);
// to fetch user by specific ID from params
userRouter.get(
  '/:id',
  // isAuth,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

// to updatedUser
userRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      user.isSeller = Boolean(req.body.isSeller);
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

// to delete a user
userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'iamkkn@gmail.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      await user.remove();
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // if ((req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          isVerified: user.isVerified,
          followers: user.followers,
          following: user.following,
          token: generateToken(user),
          username: user.username,
        });
        return;
      }
    }
    res.status(401).send({
      message: `Rossz email cím vagy jelszó \n\n\n —— Invalid email or password`,
    });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    try {
      // const { error } = validate(req.body);
      // if (error)
      //   return res.status(400).send({ message: error.details[0].message });

      let user = await User.findOne({ email: req.body.email });
      let userName = await User.findOne({ username: req.body.username });
      if (user)
        return res.status(409).send({
          message: `Ez az e-mail már létezik! —— This email already exist!`,
        });

      if (userName)
        return res.status(409).send({
          message: `${userName.username} Felhasználónév már létezik —— username already exists`,
        });
      if (req.body.password.length <= 7)
        return res.status(409).send({
          message: `A jelszónak 7 karakternél hosszabbnak kell lennie —— Password should be more than 7 characters long`,
        });

      if (req.body.password === '') {
        return res.status(409).send({
          message: 'Kérem írja be a jelszavát! —— Please enter your password!',
        });
      }

      // user = await new User({ ...req.body, password: hashPassword }).save();

      user = new User({
        name: req.body.name,
        email: req.body.email,
        // password: bcrypt.hashSync(req.body.password, 10),
        password: req.body.password,
        username: req.body.username,
      });
      const createdUser = await user.save(); // save the created user in the  database and return it to the user object returned from create
      res.send({
        _id: createdUser._id,
        name: user.name,
        email: user.email,
        image: user.image,
        isAdmin: createdUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(createdUser),
        username: user.username,
        followers: user.followers,
        following: user.following,
      });
      // const token = await new Token({
      //   userId: user._id,
      //   token: crypto.randomBytes(32).toString('hex'),
      // }).save();
      // const url = `${process.env.BASEURL}users/${user.id}/verify/${token.token}`;
      // // await sendEmail(user.email, 'Verify Email', url);

      const data = {
        from: 'noreply@Zalazon.hu',
        to: user.email,
        subject: 'Thank you for Registeration - Zalazon.',
        html: `
          Dear! <b>${user.name}</b>
          <p>You are successfully registered at Zalazon.</p>
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
          return;
          // res.json({
          //   message: `You are successfully registered at Zalazon.`,
          // });
        });

      // res
      //   .status(201)
      //   .send({ message: 'An Email sent to your account please verify' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
    // const user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   // password: bcrypt.hashSync(req.body.password, 10),
    //   password: req.body.password,
    //   username: req.body.username,
    // });
    // const createdUser = await user.save(); // save the created user in the  database and return it to the user object returned from create
    // res.send({
    //   _id: createdUser._id,
    //   name: user.name,
    //   email: user.email,
    //   image: user.image,
    //   isAdmin: createdUser.isAdmin,
    //   isSeller: user.isSeller,
    //   token: generateToken(createdUser),
    //   username: user.username,
    //   followers: user.followers,
    //   following: user.following,
    // });
  })
);

userRouter.post(
  '/join_seller',
  expressAsyncHandler(async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      let userName = await User.findOne({ username: req.body.username });
      if (user)
        return res.status(409).send({
          message: `Ez az e-mail már létezik! —— This email already exist!`,
        });

      if (userName)
        return res.status(409).send({
          message: `${userName.username} Felhasználónév már létezik —— username already exists`,
        });
      if (req.body.password.length <= 7)
        return res.status(409).send({
          message: `A jelszónak 7 karakternél hosszabbnak kell lennie —— Password should be more than 7 characters long`,
        });
      if (req.body.isSeller === false)
        return res.status(409).send({
          message: `Kérjük, jelölje be az IGEN-t, ha üzletet szeretne nyitni —— Please mark YES if you want to open a store`,
        });

      if (req.body.password === '') {
        return res.status(409).send({
          message: 'Kérem írja be a jelszavát! —— Please enter your password!',
        });
      }

      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        isSeller: Boolean(req.body.isSeller),
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: user.name,
        email: user.email,
        image: user.image,
        isAdmin: createdUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(createdUser),
        username: user.username,
        followers: user.followers,
        following: user.following,
      });

      const data = {
        from: 'noreply@Zalazon.hu',
        to: user.email,
        subject: 'Successful Store Registeration - Zalazon.',
        html: `
          Dear! <b>${user.name}</b>
          <p><b>Thank you!</b> for opening an online store at Zalazon.</p>
          <p>You can <a href="https://www.zalazon.hu/signin">login</a> and find next step and settings in your account.</p>
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
          return;
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  })
);

//
//
//
userRouter.post(
  '/register/verify',
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const { name, username, email, password } = req.body;
    User.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          error:
            'User with the same email already exists. Try to Login Instead.',
        });
      }

      const RegisterverifyToken = jwt.sign(
        {
          name,
          email,
          username,
          password,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );
      const data = {
        from: 'noreply@Zalazon.com',
        to: email,
        subject: 'Account Verification Link - Zalazon.',
        html: `
        <h2>Please Click on the link below to verify your account.</h2>
        <p>${process.env.FRONTEND_URL_VERIFY_ACCOUNT}/authentication/activate/${RegisterverifyToken}</p>
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
            message:
              'Email has been sent Successfully. Kindy check your email address and activate your account. - Zalazon.',
          });
          // console.log(body);
        });

      // let newUser = new User({ name, username, email, password });
      // newUser.save((err, success) => {
      //   if (err) {
      //     console.log('Error in Signup', err);
      //     return res.status(400), json({ error: err });
      //   }
      //   res.json({
      //     message: 'Successfully signed up',
      //   });
      // });
    });
  })
);
userRouter.post(
  '/email-activate/account/:RegisterverifyToken',
  activateAccount
);

userRouter.post('/signup/new', NewSignUp);
userRouter.post('/signin/new', NewSignIn);

// ZainK
// userRouter.post('/zain/register', registerUser);
// userRouter.post('/zain/login', loginUser);
// userRouter.get('/zain/:id', getUser);
userRouter.get('/', getAllUsers);
// userRouter.put('/zain/:id', updateUser);
// userRouter.delete('/zain/:id', authMiddleWare, deleteUser);
userRouter.put('/zain/:id/follow', followUser);
userRouter.put('/zain/:id/unfollow', unfollowUser);

userRouter.post('/registerv1', registerUserv1);
userRouter.post('/loginv1', loginUserv1);
userRouter.get('/logoutv1/:id', logoutv1);
// userRouter.post('/password/forgot', forgotPasswordv1);
// userRouter.put('/password/reset/:token', resetPasswordv1);
// userRouter.get('/profile/me/v1', isAuthenticatedUser, getUserProfilev1);
// userRouter.put('/profile/me/v1/update', isAuthenticatedUser, updateProfilev1);
// userRouter.put('/password/update', isAuthenticatedUser, updatePasswordv1);

// userRouter.get(
//   '/admin/v1/users',
//   isAuthenticatedUser,
//   authorizeRoles(ROLES_LIST.Admin),
//   allUsersv1
// );

// userRouter.get(
//   '/admin/v1/user/:id',
//   isAuthenticatedUser,
//   authorizeRoles(ROLES_LIST.Admin),
//   getUserDetailsv1
// );

// userRouter.put(
//   '/admin/v1/user/:id',
//   isAuthenticatedUser,
//   authorizeRoles(ROLES_LIST.Admin),
//   updateUserv1
// );

// userRouter.delete(
//   '/admin/v1/user/:id',
//   isAuthenticatedUser,
//   authorizeRoles(ROLES_LIST.Admin),
//   deleteUserv1
// );

export default userRouter;
