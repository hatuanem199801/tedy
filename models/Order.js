import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provider fullname of this product."],
  },
  address: {
    type: String,
    required: [true, "Please provider address of this product."],
  },
  phonenumber: {
    type: String,
    required: [true, "Please provider phone number of this product."],
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number },
    },
  ],
  status: {
    type: String,
    default: "NEW",
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.models = {};

const Order = mongoose.model("Order", orderSchema);

export default Order;
