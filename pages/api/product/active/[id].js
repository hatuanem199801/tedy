import dbConnect from "../../../../configs/dbConnect";
import { Product } from "../../../../models";
import Cors from "cors";
import initMiddleware from "../../../../libs/init-middleware";
const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

const handler = async (req, res) => {
  await cors(req, res);
  const { query } = req;
  let result = await Product.findOne({ _id: query.id });
  if (result) {
    result.isActive = !result.isActive;
    result.save();
    return res.json({
      status: 200,
      message: "success",
      data: result.isActive,
    });
  } else {
    return res.json({
      status: 404,
      message: "failed",
      data: false,
    });
  }
};

export default dbConnect(handler);
