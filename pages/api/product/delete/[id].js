import dbConnect from "../../../../configs/dbConnect";
import { Product, Category } from "../../../../models";
import Cors from "cors";
import initMiddleware from "../../../../libs/init-middleware";
import { projectStorage } from "../../../../firebase/config";
const cors = initMiddleware(
  Cors({
    methods: ["DELETE"],
  })
);

const handler = async (req, res) => {
  await cors(req, res);
  const { query } = req;
  let result = await Product.findOneAndDelete({ _id: query.id }).populate(
    "category",
    "title seourl _id",
    Category
  );
  if (result.images && result.images.length > 0) {
    result.images.map((image) => {
      let ref = projectStorage.refFromURL(image);
      if (ref) {
        ref.delete();
      }
    });
  }
  return res.json({
    status: 200,
    message: "success",
    data: JSON.parse(JSON.stringify(result)),
  });
};

export default dbConnect(handler);
