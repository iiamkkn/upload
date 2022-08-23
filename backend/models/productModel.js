import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    comment: { type: String, required: false },
    rating: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: false, unique: true },
    Hname: { type: String, required: false, unique: true },
    seller: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
      required: true,
    },
    userId: { type: String, required: false },
    sellerId: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
      required: false,
    },
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    sellerName: {
      type: mongoose.Schema.Types.String,
      ref: 'User.seller.name',
      required: false,
    },
    Sellerimage: { type: String, required: false },

    slug: { type: String, required: false, unique: false },
    image: { type: String, required: false },
    images: [String],
    brand: { type: String, required: false },
    category: { type: String, required: false },
    description: { type: String, required: false },
    Hdescription: { type: String, required: false },
    price: { type: Number, required: false },
    size: { type: Array },
    color: { type: Array },
    countInStock: { type: Number, required: false },
    rating: { type: Number, required: false },
    numReviews: { type: Number, required: false },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
