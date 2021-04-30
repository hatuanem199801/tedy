import dbConnect from "../../../configs/dbConnect";
import { Product, Category } from "../../../models";
import Cors from "cors";
import initMiddleware from "../../../libs/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST"],
  })
);
const handler = async (req, res) => {
  const {
    query: { slug },
  } = req;
  await cors(req, res);
  let category = slug[0];
  let limit = slug[1];
  let result;

  if (category && limit && category !== "null" && limit !== "null") {
    const res = await Category.findOne({ seourl: category }, "_id");
    if (res) {
      result = await Product.find({ category: res._id })
        .populate("category", "title seourl -_id", Category)
        .limit(parseInt(limit));
    }
  }

  return res.json({
    status: 200,
    message: "success",
    data: result,
  });
};

export default dbConnect(handler);
