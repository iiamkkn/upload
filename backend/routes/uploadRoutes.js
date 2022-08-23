var express = require('express');
var exprmulteress = require('multer');
var cloudinary = require('cloudinary');
var streamifier = require('streamifier');
var isAuth = require('../utils.js');
var isSellerOrAdmin = require('../utils.js');

// import { v2 as cloudinary } from 'cloudinary';

const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post(
  '/image',
  isAuth,
  // isSellerOrAdmin,
  upload.single('file'),
  async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.send(result);
  }
);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });
// const uploadLocalStorage = multer({ storage: storage });

// uploadRouter.post('/zain', uploadLocalStorage.single('file'), (req, res) => {
//   try {
//     return res.status(200).json('File uploded successfully');
//   } catch (error) {
//     console.error(error);
//   }
// });
module.exports = { uploadRouter };
