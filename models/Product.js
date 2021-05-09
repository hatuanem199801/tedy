import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provider name of this product."],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please provider category of this product."],
  },
  seourl: {
    type: String,
    required: [true, "Please provider seourl of this product."],
  },
  price: {
    type: Number,
    required: [true, "Please provider price of this product."],
  },
  images: [{ type: String }],
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "NEW",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
});
mongoose.models = {};

const Product = mongoose.model("Product", productSchema);

export default Product;
