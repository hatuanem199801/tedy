import dbConnect from "../../configs/dbConnect";
import { Category } from "../../models";
import Product from "../../models/Product";
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
      result = await Product.create(body);
    default:
      result = await Product.find({ isActive: true })
        .sort({ date_created: -1 })
        .populate("category", "title -_id", Category);
      if (limit) {
        result = await Product.find()
          .sort({ date_created: -1 })
          .limit(parseInt(limit));
      }
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
