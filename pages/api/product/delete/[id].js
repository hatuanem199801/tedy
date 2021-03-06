import dbConnect from "../../../../configs/dbConnect";
import { Product, Category } from "../../../../models";
import Cors from "cors";
import initMiddleware from "../../../../libs/init-middleware";
const cors = initMiddleware(
  Cors({
    methods: ["DELETE"],
  })
);

const handler = async (req, res) => {
  await cors(req, res);
  const { query } = req;
  let result = await Product.findByIdAndRemove({ _id: query.id }).populate(
    "category",
    "title seourl _id",
    Category
  );
  if (result) {
    return res.json({
      status: 200,
      message: "success",
      data: JSON.parse(JSON.stringify(result)),
    });
  } else {
    return res.json({
      status: 404,
      message: "failed",
      data: "Xoá sản phẩm không thành công",
    });
  }
};

export default dbConnect(handler);
