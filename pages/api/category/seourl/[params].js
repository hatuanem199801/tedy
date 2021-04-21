import dbConnect from "../../../../configs/dbConnect";
import { Product, Category } from "../../../../models";

const handler = async (req, res) => {
  const { query } = req;
  let result = await Category.findOne({ seourl: query.params });
  console.log(result);
  const products = await Product.find({
    category: result._id,
  }).populate("category", "title seourl _id", Category);
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(products)),
  });
};

export default dbConnect(handler);
