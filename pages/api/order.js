import dbConnect from "../../configs/dbConnect";
import Order from "../../models/Order";

const handler = async (req, res) => {
  const {
    query: { limit },
    method,
    body,
  } = req;

  let result;

  switch (method) {
    case "POST":
      result = await Order.create(body);
    default:
      result = await Order.find();
      if (limit) {
        result = await Order.find().limit(parseInt(limit));
      }
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
