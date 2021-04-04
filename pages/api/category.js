import dbConnect from "../../configs/dbConnect";
import Category from "../../models/Category";

const handler = async (req, res) => {
  const { method, body } = req;
  let result;
  switch (method) {
    case "POST":
      result = await Category.create(body);
    default:
      result = await Category.find();
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
