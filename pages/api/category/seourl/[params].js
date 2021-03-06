import dbConnect from "../../../../configs/dbConnect";
import { Product, Category } from "../../../../models";
import Cors from "cors";
import initMiddleware from "../../../../libs/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST"],
  })
);

const handler = async (req, res) => {
  await cors(req, res);
  const { query } = req;
  let result = await Category.findOne({ seourl: query.params });
  const products = await Product.find({
    category: result._id,
  }).populate("category", "title seourl _id", Category);
  return res.json({
    status: 200,
    message: "success",
    data: {
      products: JSON.parse(JSON.stringify(products)),
      category: JSON.parse(JSON.stringify(result)),
    },
  });
};

export default dbConnect(handler);
