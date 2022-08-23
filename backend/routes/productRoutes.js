import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from '../controllers/PostController.js';
// import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';
// import ROLES_LIST from '../config/roles_list.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  // isAuthenticatedUser,
  // authorizeRoles(ROLES_LIST.Admin),
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const seller = req.query.seller || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    // const sellerFilter = Product.findOne({ _id: id }).populate('seller');
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
    }).populate('seller', 'seller.name seller.logo');
    res.send(products);
  })
);

// create a new product post
productRouter.post(
  '/',
  isAuth,
  // isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: 'sample name ' + Date.now(),
      Hname: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      sellerName: req.user.name,
      Sellerimage: req.user.image,
      seller: req.user._id,
      sellerId: req.user._id,
      userId: req.user._id,
      image: '/images/p1.jpg',
      price: 0,
      category: 'Clothes',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
      Hdescription: 'sample description',
      size: 'S ,X, L',
      color: 'red, blue, green',
    });
    const product = await newProduct.save();
    res.send({ message: 'Product Uploaded Successfully', product });
  })
);

// update the product by ID
productRouter.put(
  '/:id',
  isAuth,
  // isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.Hname = req.body.Hname;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.images = req.body.images;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.Hdescription = req.body.Hdescription;
      product.size = req.body.size;
      product.color = req.body.color;

      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

// Create and submit review form
productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res.status(400).send({
          message:
            'Már benyújtott véleményt \n\n\n  —— You already submitted a review',
        });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

let PAGE_SIZE = 5;

productRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'seller',
    'seller.name seller.logo seller.rating seller.numReviews'
  );
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

// Zain

productRouter.post('/zain', createPost);
productRouter.get('/zain/:id', getPost);
productRouter.put('/zain/:id', updatePost);
productRouter.delete('/zain/:id', deletePost);
productRouter.put('/zain/:id/like', likePost);
productRouter.get('/zain/:id/timeline', getTimelinePosts);

export default productRouter;
