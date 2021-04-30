import dbConnect from "../../configs/dbConnect";
import { Product } from "../../models";
import Order from "../../models/Order";
import Cors from "cors";
import initMiddleware from "../../libs/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST"],
  })
);

const handler = async (req, res) => {
  const {
    query: { limit },
    method,
    body,
  } = req;
  await cors(req, res);

  let result;

  switch (method) {
    case "POST":
      result = await Order.create(body);
    default:
      result = await Order.find()
        .populate("products.product", "name price images -_id", Product)
        .sort({ date_created: -1 });
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
