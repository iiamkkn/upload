var express = require('express');
var expressAsyncHandler = require('express-async-handler');
var Order = require('../models/orderModel.js');
var User = require('../models/userModel.js');
var Product = require('../models/productModel.js');
var isAuth = require('../utils.js');
var isAdmin = require('../utils.js');
var isSellerOrAdmin = require('../utils.js');
var mailgun = require('../utils.js');
var payOrderEmailTemplate = require('../utils.js');

const orderRouter = express.Router();

// Get and List all orders
orderRouter.get(
  '/',
  isAuth,
  // isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    // const orders = await Order.find().populate('user', 'name');
    const orders = await Order.find({ ...sellerFilter }).populate(
      'user',
      'name'
    );

    res.send(orders);
  })
);

// Create new order
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const newOrder = new Order({
        seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
        sellerNumOrder: req.body.sellerNumOrder,
        paymentInfo: req.body.paymentInfo,
      });

      const order = await newOrder.save();
      res.status(201).send({ message: 'New Order Created', order });
    }
  })
);

// // Create new order
// orderRouter.post(
//   '/',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const newOrder = new Order({
//       orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
//       shippingAddress: req.body.shippingAddress,
//       paymentMethod: req.body.paymentMethod,
//       itemsPrice: req.body.itemsPrice,
//       shippingPrice: req.body.shippingPrice,
//       taxPrice: req.body.taxPrice,
//       totalPrice: req.body.totalPrice,
//       user: req.user._id,
//     });

//     const order = await newOrder.save();
//     res.status(201).send({ message: 'New Order Created', order });
//   })
// );

// Get the order details as summary
orderRouter.get(
  '/summary',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);

    const SellNum = await Order.aggregate([
      {
        $group: {
          _id: null,
          sellerNumOrder: { $sum: 1 },
          sellerNumOrdertotal: { $sum: '$sellerNumOrder' },
        },
      },
    ]);

    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);

    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ SellNum, users, orders, dailyOrders, productCategories });
  })
);

// Get user orders history
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// To deliver the order
orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// Pay order details for current user and current user's account
orderRouter.put(
  '/:id/pay',
  // isAuth,

  expressAsyncHandler(async (req, res) => {
    // we populate the order details and get the user details (user, user's email and name)
    // to send by mailgunjs email template
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
    // updating order and its quantity after successful payment
    if (order) {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      (order.paymentInfo = {
        id: req.body.id,
        status: req.body.status,
      }),
        (order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        });

      // here we update the order after payment
      const updatedOrder = await order.save();
      // bwfore we notified the order is paid, we also send order-paid confirmation message by email
      try {
        mailgun()
          .messages()
          .send(
            {
              from: 'Zalazon <support@zalazon.com>',
              to: `${order.user.name} <${order.user.email}>`,
              subject: `You bought new product from Zalazon. with order ID [${order._id}]`,
              html: payOrderEmailTemplate(order),
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
      // here we send that order is paid after sending the order details to the user's email
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
// updating product and its quantity after successful payment fucntion

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.countInStock -= quantity;

  await product.save({ validateBeforeSave: false });
}
// delete order
orderRouter.delete(
  '/:id',
  isAuth,
  // isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.send({ message: 'Order Deleted' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
module.exports = { orderRouter };
