import dbConnect from "../../../configs/dbConnect";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  const {
    query: { slug },
  } = req;
  console.log(slug);
  let category = slug[0];
  let limit = slug[1];
  let result;
  result = await Product.find();
  if (category && limit && category !== "null" && limit !== "null") {
    console.log("category and limit has called");
    result = await Product.find({ category }).limit(parseInt(limit));
  }

  if (category && category !== "null") {
    console.log("category has called");
    result = await Product.find({ category });
  }

  if (limit && limit !== "null") {
    console.log("Limit has called");
    result = await Product.find().limit(parseInt(limit));
  }
  return res.json({
    status: 200,
    message: "success",
    data: result,
  });
};

export default dbConnect(handler);
