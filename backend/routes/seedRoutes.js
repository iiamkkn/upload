var express = require('express');
var Product = require('../models/productModel.js');
var data = require('../data.js');
var User = require('../models/userModel.js');
var expressAsyncHandler = require('express-async-handler');

const seedRouter = express.Router();

// seedRouter.get('/', async (req, res) => {
//   await Product.remove({});
//   const createdProducts = await Product.insertMany(data.products);
//   await User.remove({});
//   const createdUsers = await User.insertMany(data.users);
//   res.send({ createdProducts, createdUsers });
// });
// export default seedRouter;

seedRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
      const products = data.products.map((product) => ({
        ...product,
        seller: seller._id,
      }));
      const createdProducts = await Product.insertMany(products);
      res.send({ createdProducts });
    } else {
      res
        .status(500)
        .send({ message: 'No seller found. first run /api/users/seed' });
    }
  })
);
module.exports = { seedRouter };
