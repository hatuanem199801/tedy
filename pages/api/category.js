import dbConnect from "../../configs/dbConnect";
import Category from "../../models/Category";
import Cors from "cors";
import initMiddleware from "../../libs/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST"],
  })
);
const handler = async (req, res) => {
  const { method, body } = req;
  await cors(req, res);
  let result;
  switch (method) {
    case "POST":
      result = await Category.create(body);
    default:
      result = await Category.find({ isActive: true }).sort({
        date_created: -1,
      });
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
