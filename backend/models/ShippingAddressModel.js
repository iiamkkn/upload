import mongoose from 'mongoose';

const ShippingAddressSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalcode: { type: Number, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ShippingAddress = mongoose.model(
  'ShippingAddress',
  ShippingAddressSchema
);
export default ShippingAddress;
