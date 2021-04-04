import dbConnect from "../../configs/dbConnect";
import Product from "../../models/Product";

const handler = async (req, res) => {
  const {
    query: { limit },
    method,
    body,
  } = req;

  let result;
  switch (method) {
    case "POST":
      result = await Product.create(body);
    default:
      result = await Product.find();
      if (limit) {
        result = await Product.find().limit(parseInt(limit));
      }
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
