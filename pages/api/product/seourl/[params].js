import dbConnect from "../../../../configs/dbConnect";
import { Product, Category } from "../../../../models";

const handler = async (req, res) => {
  const { query } = req;
  let result = await Product.findOne({ seourl: query.params }).populate(
    "category",
    "title seourl _id",
    Category
  );
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
