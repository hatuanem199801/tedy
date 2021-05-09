import dbConnect from "../../../../configs/dbConnect";
import { Category } from "../../../../models";
import Product from "../../../../models/Product";
import initMiddleware from "../../../../libs/init-middleware";
import Cors from "cors";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

const handler = async (req, res) => {
  const {
    query: { limit },
  } = req;
  await cors(req, res);

  let result = await Product.find()
    .sort({ date_created: -1 })
    .populate("category", "title -_id", Category);
  if (limit) {
    result = await Product.find()
      .sort({ date_created: -1 })
      .limit(parseInt(limit));
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
