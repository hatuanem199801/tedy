import dbConnect from "../../../../configs/dbConnect";
import { Product, Category } from "../../../../models";
import Cors from "cors";
import initMiddleware from "../../../../libs/init-middleware";
const cors = initMiddleware(
  Cors({
    methods: ["PUT"],
  })
);

const handler = async (req, res) => {
  await cors(req, res);
  const { query } = req;
  const { data } = req.body;
  let result = await Product.findByIdAndUpdate(
    { _id: query.id },
    {
      data,
    }
  ).populate("category", "title seourl _id", Category);
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
      data: "Cập nhật sản phẩm không thành công",
    });
  }
};

export default dbConnect(handler);
