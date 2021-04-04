import dbConnect from "../../../../configs/dbConnect";
import Product from "../../../../models/Product";

const handler = async (req, res) => {
  const { query } = req;
  let result = await Product.find({ seourl: query.params });
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
